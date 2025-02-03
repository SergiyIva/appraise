import * as Menu from "@radix-ui/react-context-menu";
import { PropsWithChildren } from "react";
import { styled } from "@/styled-system/jsx";
import { useMutation } from "@apollo/client";
import { REMOVE_USER } from "@/graphql/Mutation";
import { GET_USER_TREE } from "@/graphql/Query";
import { ChangeManagerVar } from "@/src/lib/cache";

type ContextMenuProps = {
  userId: number;
};

const ContextMenuContent = styled(Menu.Content, {
  base: {
    minWidth: "220px",
    backgroundColor: "white",
    border: "1px solid",
    borderColor: "dark.100",
    borderRadius: "0.3em",
    overflow: "hidden",
    padding: "0.3em",
    boxShadow:
      "0px 10px 38px -10px rgba(22, 23, 24, 0.35), " +
      "0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
    _disabled: {
      userSelect: "none",
    },
  },
});
const ContextMenuItem = styled(Menu.Item, {
  base: {
    fontSize: "0.9rem",
    lineHeight: "1",
    color: "secondary",
    fontWeight: "bold",
    borderRadius: "0.25em",
    display: "flex",
    alignItems: "center",
    height: "25px",
    padding: "0 0.3em",
    position: "relative",
    paddingLeft: "25px",
    userSelect: "none",
    outline: "none",
    cursor: "pointer",
    _hover: {
      color: "dark.100",
    },
    _disabled: {
      cursor: "progress",
      color: "dark.100",
    },
  },
});
const ContextMenuSeparator = styled(Menu.Separator, {
  base: {
    height: "1px",
    backgroundColor: "secondary",
    margin: "0.3em",
  },
});

export const ContextMenu = ({
  userId,
  children,
}: PropsWithChildren<ContextMenuProps>) => {
  const [remove, { loading, client }] = useMutation(REMOVE_USER, {
    variables: {
      id: userId,
    },
    onCompleted: (data) => {
      client.cache.writeQuery({
        query: GET_USER_TREE,
        data: {
          getUserTree: data.removeUser,
        },
      });
    },
  });
  return (
    <Menu.Root>
      <Menu.Trigger>{children}</Menu.Trigger>
      <Menu.Portal>
        <ContextMenuContent>
          <ContextMenuItem disabled={loading} onClick={() => remove()}>
            Удалить
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem
            disabled={loading}
            onClick={() => ChangeManagerVar(userId)}
          >
            Изменить руководителя
          </ContextMenuItem>
        </ContextMenuContent>
      </Menu.Portal>
    </Menu.Root>
  );
};
