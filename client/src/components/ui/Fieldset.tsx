import { styled } from "@/styled-system/jsx";
import { PropsWithChildren } from "react";

type FieldSetProps = {
  id: string;
  name: string;
};

const Wrapper = styled("fieldset", {
  base: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginBottom: "15px",
  },
});

const Label = styled("label", {
  base: {
    width: "90px",
    textAlign: "right",
  },
});

export const Fieldset = ({
  id,
  name,
  children,
}: PropsWithChildren<FieldSetProps>) => {
  return (
    <Wrapper>
      <Label htmlFor={id}>{name}</Label>
      {children}
    </Wrapper>
  );
};
