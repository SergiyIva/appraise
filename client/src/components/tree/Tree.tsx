"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_USER_TREE } from "@/graphql/Query";
import { Box, styled } from "@/styled-system/jsx";
import { Nodes } from "@/src/components/tree/components/Nodes";

const Wrapper = styled(Box, {
  base: {
    p: "1rem",
    mt: "5rem",
    width: "100vw",
    minWidth: "max-content",
  },
});

const Container = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    px: "1rem",
  },
});

export const Tree = () => {
  const { data } = useSuspenseQuery(GET_USER_TREE);
  return (
    <Wrapper>
      {data.getUserTree ? (
        <Container>
          <Nodes users={data.getUserTree} />
        </Container>
      ) : (
        <div>
          Пользователи не найдены. Добавьте пользователей, кликнув по кнопке
          верхнем правом углу экрана.
        </div>
      )}
    </Wrapper>
  );
};
