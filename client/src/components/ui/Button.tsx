import { styled } from "@/styled-system/jsx";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cva } from "@/styled-system/css";

const button = cva({
  base: {
    borderRadius: "0.5em",
    fontWeight: "bold",
    transition: "background-color 0.3s ease-in-out",
    cursor: "pointer",
  },
  variants: {
    visual: {
      solid: {
        bg: "primary.700",
        color: "white",
        "&:hover": {
          bg: "primary.900",
        },
      },
      outline: {
        borderWidth: "1px",
        borderColor: "primary.700",
        "&:hover": {
          bg: "primary.100",
        },
      },
    },
    size: {
      sm: { padding: "4 12", fontSize: "0.85rem" },
      md: { padding: "8 24", fontSize: "1rem" },
      lg: { padding: "12 36", fontSize: "1.25rem" },
    },
    disabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
  defaultVariants: {
    visual: "solid",
    size: "md",
  },
});

const BaseButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    asChild?: boolean;
    children?: React.ReactNode;
  }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} {...props} />;
});
BaseButton.displayName = "Button";

export const Button = styled(BaseButton, button);
