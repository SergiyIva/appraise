import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled } from "@/styled-system/jsx";
import { PropsWithChildren } from "react";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = styled(DialogPrimitive.Overlay, {
  base: {
    backgroundColor: "dark.100",
    opacity: 0.5,
    position: "fixed",
    inset: 0,
    animation: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
});
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const Content = styled(DialogPrimitive.Content, {
  base: {
    backgroundColor: "white",
    borderRadius: "6px",
    boxShadow: "3px 3px 3px 3px hsla(0, 0%, 15%, 0.4)",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "500px",
    maxHeight: "85vh",
    padding: "25px",
    "&:focus": {
      outline: "none",
    },
  },
});

const Close = styled(DialogPrimitive.Close, {
  base: {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: "25px",
    width: "25px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "dark.300",
    position: "absolute",
    top: "10px",
    right: "10px",
    cursor: "pointer",

    "&:hover": {
      color: "dark.900",
    },
    "&:focus": {
      boxShadow: "0 0 0 2px",
      boxShadowColor: "secondary.300",
    },
  },
});

const DialogContent = ({ children }: PropsWithChildren) => {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Content>
        {children}
        <Close>X</Close>
      </Content>
    </DialogPortal>
  );
};
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = styled(DialogPrimitive.Title, {
  base: {
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = styled(DialogPrimitive.Description, {
  base: {
    fontSize: "0.9rem",
    mb: "2",
  },
});
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
