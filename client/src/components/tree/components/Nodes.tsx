import { User } from "@/gql/graphql";
import _ from "lodash";
import { useMemo } from "react";
import { Group } from "@/src/components/tree/components/Group";

export type UsersTree = (User & { children?: User[] })[];

type NodesProps = {
  users: User[];
};

export const Nodes = ({ users }: NodesProps) => {
  const groupedByManager = _.groupBy(users, "managerId");
  const buildTree = (managerId: number | "null" = "null"): UsersTree => {
    const directSubordinates = (groupedByManager[managerId] || []) as User[];

    return directSubordinates.map((user) => ({
      ...user,
      children: buildTree(user.id),
    }));
  };

  const treeData = useMemo(() => buildTree(), [users]);

  return <Group users={treeData} />;
};
