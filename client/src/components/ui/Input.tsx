import { styled } from "@/styled-system/jsx";
import { cva } from "@/styled-system/css";

const input = cva({
  base: {
    borderRadius: "0.35em",
    width: "100%",
    lineHeight: 1,
    border: "1px solid",
    borderColor: "dark.500",
  },
  variants: {
    size: {
      sm: { padding: "4px", fontSize: "0.85rem" },
      md: { padding: "6px", fontSize: "1rem" },
      lg: { padding: "8px", fontSize: "1.25rem" },
    },
    disabled: {
      true: {
        bgColor: "dark.100",
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Input = styled("input", input);
