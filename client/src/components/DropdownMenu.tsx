import { type ComponentProps, type MouseEvent, type PropsWithChildren } from "react";
import { Dialog } from "./Dialog";

function onOpenEffect(dialog: HTMLDialogElement, trigger: HTMLButtonElement) {
  function onResize() {
    const dialogRect = dialog.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const triggerCenter = triggerRect.left + triggerRect.width / 2;
    const dialogHalf = dialogRect.width / 2;
    const newDialogLeft = triggerCenter - dialogHalf;
    const newDialogRight = newDialogLeft + dialogRect.width;
    const overflow = newDialogRight > window.innerWidth ? newDialogRight - window.innerWidth : 0;
    const padding = overflow ? 4 : 0;
    dialog.style.left = triggerCenter - dialogHalf - overflow - padding + "px";
    dialog.style.top = triggerRect.bottom + 10 + "px";
  }
  window.addEventListener("resize", onResize);
  onResize();
  return () => {
    console.log("cleanup");
    window.removeEventListener("resize", onResize);
  };
}

export function DropdownMenu({ children }: PropsWithChildren) {
  return <Dialog onOpenEffect={onOpenEffect}>{children}</Dialog>;
}

function onClickDialogBackdrop(e: MouseEvent<HTMLDialogElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  if (
    rect.left > e.clientX ||
    rect.right < e.clientX ||
    rect.top > e.clientY ||
    rect.bottom < e.clientY
  ) {
    e.currentTarget.close();
  }
}

DropdownMenu.Content = function Content({ className, children }: ComponentProps<"dialog">) {
  return (
    <Dialog.Content className={className} onClick={onClickDialogBackdrop}>
      {children}
    </Dialog.Content>
  );
};

DropdownMenu.Trigger = function Trigger({ className, children }: ComponentProps<"button">) {
  return <Dialog.Trigger className={className}>{children}</Dialog.Trigger>;
};
