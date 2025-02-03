import { Box, styled } from "@/styled-system/jsx";
import { User } from "@/gql/graphql";
import Image from "next/image";
import { ContextMenu } from "@/src/components/control/contextMenu/ContextMenu";
import { ChangeManagerVar } from "@/src/lib/cache";
import { useMutation, useReactiveVar } from "@apollo/client";
import { css } from "@/styled-system/css";
import { CHANGE_MANAGER } from "@/graphql/Mutation";

type CardProps = {
  user: User;
};

const Wrapper = styled(
  "div",
  {
    base: {
      display: "flex",
      position: "relative",
      flexDirection: "column",
      margin: "auto",
      alignItems: "center",
      border: "1px solid",
      borderRadius: "0.5rem",
      borderColor: "dark.100",
      borderTopWidth: "6px",
      borderTopColor: "secondary",
      padding: "0.5em 1em",
      width: "10rem",
    },
  },
  {
    dataAttr: true,
  },
);

const IconDivider = styled("div", {
  base: {
    position: "absolute",
    top: "0",
    transform: "translateY(-50%)",
    border: "1px solid",
    borderRadius: "50%",
    borderColor: "dark.100",
    bg: "white",
  },
});

const Content = styled(Box, {
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mt: "1rem",
  },
});

export const Card = ({ user }: CardProps) => {
  const changeManagerVar = useReactiveVar(ChangeManagerVar);
  const [change] = useMutation(CHANGE_MANAGER, {
    onCompleted: () => {
      ChangeManagerVar(null);
    },
  });

  const handleClick = async () => {
    if (!changeManagerVar) return;
    await change({
      variables: {
        userId: changeManagerVar,
        managerId: user.id,
      },
    });
  };

  return (
    <ContextMenu userId={user.id}>
      <Wrapper
        id={`user-${user.id}`}
        onClick={handleClick}
        className={css(
          changeManagerVar && !user.path.includes(changeManagerVar)
            ? {
                boxShadow: "0px 0 15px 4px hsla(120,70%,60%,0.35)",
                cursor: "pointer",
                _hover: {
                  boxShadow: "0px 0 15px 4px hsla(300,70%,60%,0.35)",
                },
              }
            : {},
        )}
      >
        <IconDivider>
          <Image src={"/user.svg"} width={40} height={40} alt={"User"} />
        </IconDivider>
        <Content>
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
        </Content>
      </Wrapper>
    </ContextMenu>
  );
};
