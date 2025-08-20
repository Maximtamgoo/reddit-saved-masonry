import {
  useId,
  useState,
  useEffect,
  type ComponentProps,
  type ChangeEvent,
  type FocusEvent,
} from "react";

interface Props extends ComponentProps<"input"> {
  value: number;
  onBlurValue?: (value: number) => void;
}

export function InputNumber({ value, onBlurValue, ...props }: Props) {
  const id = useId();
  const [internal, setInternal] = useState<Props["value"]>(value);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    setInternal(num);
  }

  function onBlur(e: FocusEvent<HTMLInputElement>) {
    const num = Number(e.target.value);
    if (isNaN(num)) return;
    if (onBlurValue) onBlurValue(num);
  }

  useEffect(() => setInternal(value), [value]);

  return (
    <input type="number" id={id} value={internal} onChange={onChange} onBlur={onBlur} {...props} />
  );
}
