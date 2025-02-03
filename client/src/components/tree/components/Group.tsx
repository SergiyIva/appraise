import { Card } from "@/src/components/ui/Card";
import { styled } from "@/styled-system/jsx";
import { UsersTree } from "@/src/components/tree/components/Nodes";

type GroupProps = {
  users: UsersTree;
};

const pseudo = {
  content: '""',
  position: "absolute",
  zIndex: -1,
  top: 0,
  right: "50%",
  borderTop: "2px solid",
  borderTopLeft: "dark.100",
  width: "50%",
  height: "2rem",
};

const onlyPseudo = {
  display: "none",
};

const box = {
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  position: "relative",
  width: "100%",
};

const Wrapper = styled("div", {
  base: {
    ...box,
    pt: "2rem",
    _before: {
      ...pseudo,
      left: "50%",
      borderLeft: "2px solid",
      borderLeftColor: "dark.100",
      width: 0,
    },
  },
});

const ColumnWrapper = styled("span", {
  base: {
    flexDirection: "column",
    padding: "2rem 1rem 1rem ",
    position: "relative",
    boxSizing: "border-box",
    _before: pseudo,
    _after: {
      ...pseudo,
      right: "auto",
      left: "50%",
      borderLeft: "2px solid",
      borderLeftColor: "dark.100",
    },
    _only: {
      _before: onlyPseudo,
      _after: onlyPseudo,
      pt: 0,
    },
    _first: {
      _before: {
        border: "0 none",
      },
      _after: {
        borderRadius: "0.25rem 0 0 0",
      },
    },
    _last: {
      _after: {
        border: "0 none",
      },
      _before: {
        borderRadius: "0 0.25rem 0 0",
        borderRight: "1px solid",
        borderRightColor: "dark.100",
      },
    },
  },
});

export const Group = ({ users }: GroupProps) => {
  return users.map((user) => (
    <ColumnWrapper key={user.id}>
      <Card user={user} />
      {user.children && user.children.length > 0 && (
        <Wrapper>
          <Group users={user.children} />
        </Wrapper>
      )}
    </ColumnWrapper>
  ));
};
