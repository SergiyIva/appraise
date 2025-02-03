"use client";

import { Box } from "@/styled-system/jsx";
import { Button } from "@/src/components/ui/Button";
import { faker } from "@faker-js/faker/locale/ru";
import { SexType } from "@faker-js/faker";
import { useEffect, useState } from "react";
import { css } from "@/styled-system/css";
import { Fieldset } from "@/src/components/ui/Fieldset";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "@/graphql/Mutation";
import { GET_USER_TREE } from "@/graphql/Query";
import { Input } from "@/src/components/ui/Input";
import { User } from "@/gql/graphql";

const getName = () => {
  const sex = faker.person.sex() as SexType;
  return [faker.person.firstName(sex), faker.person.lastName(sex)];
};

export const AddUser = () => {
  const [mute, { loading, client }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      const newUser = data.createUser as User;
      if (newUser.managerId) {
        const manager = managers?.find((u) => u.id === newUser.managerId);
        if (!manager) return;
        newUser.level = manager.level + 1;
        newUser.path = [...manager.path, newUser.id];
      } else {
        newUser.level = 1;
        newUser.path = [newUser.id];
      }
      if (!cache?.getUserTree) return;

      client.writeQuery({
        query: GET_USER_TREE,
        data: {
          ...cache,
          getUserTree: [...cache.getUserTree, newUser],
        },
      });
      updateName();
    },
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const cache = client.cache.readQuery({ query: GET_USER_TREE });
  const managers = cache?.getUserTree?.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    level: u.level,
    path: u.path,
  }));
  const [managerId, setManagerId] = useState(
    managers && managers.length && managers[0].id,
  );

  const updateName = () => {
    const [first, last] = getName();
    setFirstName(first);
    setLastName(last);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName || !lastName || (!!managers?.length && !managerId)) return;

    await mute({
      variables: {
        firstName,
        lastName,
        managerId: managerId || -1,
      },
    });
  };

  useEffect(() => {
    updateName();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Box position={"fixed"} top={"3"} right={"2"}>
          <Button onClick={updateName}>Добавить сотрудника</Button>
        </Box>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <form onSubmit={onSubmit} action={"submit"}>
            <DialogTitle>Добавление пользователя</DialogTitle>
            <DialogDescription>
              Укажите имя, фамилию и выберите менеджера
            </DialogDescription>
            <Fieldset id={"firstName"} name={"Имя"}>
              <Input
                id={"firstName"}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Fieldset>
            <Fieldset id={"lastName"} name={"Фамилия"}>
              <Input
                id={"lastName"}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Fieldset>
            <Fieldset id={"manager"} name={"Менеджер"}>
              <select
                disabled={!managers?.length}
                value={managerId}
                onChange={(e) => setManagerId(+e.target.value)}
              >
                {managers &&
                  managers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
              </select>
            </Fieldset>
            <div
              className={css({
                display: "flex",
                marginTop: 15,
                justifyContent: "flex-end",
              })}
            >
              <Button visual={"outline"} disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
