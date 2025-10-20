import { type ComponentProps, type ChangeEvent, type PointerEvent, useState } from "react";
import "./RangeInput.module.css";

interface Props extends ComponentProps<"input"> {
  id?: string;
  value: number;
  onChangeValue?: (value: number) => void;
  onPointerDownValue?: (value: number) => void;
  onPointerUpValue?: (value: number) => void;
}

export function RangeInput({
  id,
  value,
  onChangeValue,
  onPointerDownValue,
  onPointerUpValue,
  ...props
}: Props) {
  const [prev, setPrev] = useState(value);
  const [internal, setInternal] = useState(value);

  if (value !== prev) {
    setPrev(value);
    setInternal(value);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const num = parseInt(e.currentTarget.value);
    if (isNaN(num)) return;
    setInternal(num);
    if (onChangeValue) onChangeValue(num);
  }

  function onPointerDown(e: PointerEvent<HTMLInputElement>) {
    const num = parseInt(e.currentTarget.value);
    if (isNaN(num)) return;
    if (onPointerDownValue) onPointerDownValue(num);
  }

  function onPointerUp(e: PointerEvent<HTMLInputElement>) {
    const num = parseInt(e.currentTarget.value);
    if (isNaN(num)) return;
    if (onPointerUpValue) onPointerUpValue(num);
  }

  return (
    <input
      type="range"
      id={id}
      value={internal}
      onChange={onChange}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      {...props}
    />
  );
}
