import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, IsNull, Not, Repository } from "typeorm";
import { User as UserDTO } from "@modules/user/dto/user.model";
import { User } from "@modules/user/user.entity";

@Injectable()
export class UserService {
  private readonly logger = new Logger("UserService");

  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(firstName: string, lastName: string, managerId: number) {
    let isError = false;
    if (managerId === -1) {
      const userCount = await this.userRepository.count();
      if (userCount) isError = true;
    } else {
      const isManagerExists = await this.userRepository.findOne({
        where: {
          id: managerId,
        },
      });
      if (!isManagerExists) isError = true;
    }
    if (isError) throw new BadRequestException("Manager does not exist");

    return this.userRepository.save({
      firstName,
      lastName,
      ...(managerId !== -1
        ? {
            managerId,
          }
        : {}),
    });
  }

  async changeManager(userId: number, managerId: number) {
    if (userId === managerId)
      throw new BadRequestException("A user cannot be their own manager");

    const tree = await this.getTree();
    const rootUser = tree.find((u) => u.level === 1);
    if (!rootUser)
      throw new BadRequestException("The structure does not have a root user");

    const user = tree.find((u) => u.id === userId);
    const manager = tree.find((u) => u.id === managerId);
    if (!manager || !user) throw new BadRequestException("Check user's id");
    if (rootUser.id === userId)
      throw new BadRequestException("The root user cannot have manager");
    if (manager.path.includes(user.id))
      throw new BadRequestException("Cycle dependency is not allow");

    await this.userRepository.update({ id: userId }, { managerId });

    /*
    В продуктовой среде лучше возвращать измененный объект пользователя,
    на основании которого на клиенте выполнять изменение дочерних элементов:
    1. Установить level для всех дочерних элементов равным сумме level'а
       текущего пользователя + дельте изменения уровней.
    2. Выполнить изменение path всех дочерних элементов - удалить N кол-во
       эл-в массива, и добавить новые елементы массива, полученные из
       path обновленного объекта пользователя, где N - длина массива path обновленного
       пользователя ДО изменения.
    return {
      ...user,
      managerId,
      level: manager.level + 1,
      path: [...manager.path, user.id],
    };
    */
    return this.getTree();
  }

  /*
   * В продуктовой среде имеет смысл вынести дерево в кэш,
   * также реализовать сегментацию дерева с указанием глубины от текущего узла,
   * для получения данных дерева частями, например, в зависимости от зоны видимости
   * дерева на клиенте. В случае большого кол-ва узлов.
   * */
  async getTree() {
    return (await this.userRepository.query(`
        WITH RECURSIVE user_tree AS (SELECT id,
                                            "firstName",
                                            "lastName",
                                            "managerId",
                                            1         AS level,
                                            ARRAY[id] AS path
                                     FROM "user"
                                     WHERE "managerId" IS NULL

                                     UNION ALL

                                     SELECT u.id,
                                            u."firstName",
                                            u."lastName",
                                            u."managerId",
                                            ut.level + 1,
                                            ut.path || u.id AS path
                                     FROM "user" AS u
                                              JOIN user_tree AS ut ON u."managerId" = ut.id)
        SELECT *
        FROM user_tree
        ORDER BY level, id;
    `)) as UserDTO[];
  }

  async remove(userId: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: {
          id: userId,
          managerId: Not(IsNull()),
        },
        select: {
          id: true,
          managerId: true,
          subordinates: {
            id: true,
          },
        },
        relations: {
          subordinates: true,
        },
      });
      if (!user) {
        const userCount = await queryRunner.manager.count(User);
        if (userCount > 1) throw new Error("User not found or user is root!");
      } else {
        await queryRunner.manager.update(
          User,
          {
            managerId: userId,
          },
          {
            managerId: user.managerId,
          },
        );
      }

      await queryRunner.manager.delete(User, userId);

      await queryRunner.commitTransaction();

      /* NOTE: в продуктовом окружении лучше возвращать true/false при выполнении данного запроса,
       на стороне клиента при успехе выполнять следующий алгоритм действий:
       1. Удалить id текущего удаленного пользователя из всех path дочерних элементов.
       2. Уменьшить level на 1 для всех дочерних элементов удаленного пользователя.
       3. Установить managerId равным managerId удаленного пользователя для всех элементов,
          у которых managerId = id удаленного пользователя.
      */
      return this.getTree();
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }
}
