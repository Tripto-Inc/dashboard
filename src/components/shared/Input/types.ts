export type NumberInputProps = {
  id: string;
  step?: number;
  className?: string;
  placeholder: string;
  ariaInvalid: boolean;
  value?: number | null;
  onChange: (value?: number) => void;
};
