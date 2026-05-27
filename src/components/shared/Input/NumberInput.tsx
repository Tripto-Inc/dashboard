import { IconMinus, IconPlus } from '@tabler/icons-react';
import { FC } from 'react';
import { Button, Group, Input, NumberField } from 'react-aria-components';
import { NumberInputProps } from './types';
import clsx from 'clsx';

export const NumberInput: FC<NumberInputProps> = (props) => {
  const { id, value, onChange, step, placeholder, ariaInvalid, className } = props;

  return (
    <NumberField
      id={id}
      step={step}
      value={value ?? undefined}
      onChange={(value) => onChange(!value ? undefined : Number(value))}
      className="w-full space-y-2"
    >
      <Group
        aria-invalid={ariaInvalid}
        className={clsx(
          'relative inline-flex h-11.5 w-full min-w-0 items-center overflow-hidden rounded-md border border-slate-200 bg-slate-50/50 text-base whitespace-nowrap transition-[color,box-shadow] outline-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-within:ring-[3px] md:text-sm',
          'data-focus-within:border-blue-500 data-focus-within:ring-[3px] data-focus-within:ring-blue-500/40',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
          className,
        )}
      >
        <Input
          step={step}
          placeholder={placeholder}
          className="selection:bg-primary selection:text-primary-foreground w-full grow px-4 text-left tabular-nums outline-none placeholder:text-slate-400"
        />
        <Button
          slot="decrement"
          className="-me-px flex aspect-square h-[inherit] items-center justify-center border border-slate-200 bg-transparent text-sm text-slate-500 transition-[color,box-shadow] hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconMinus />
          <span className="sr-only">Decrement</span>
        </Button>
        <Button
          slot="increment"
          className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-r-md border border-slate-200 bg-transparent text-sm text-slate-500 transition-[color,box-shadow] hover:bg-slate-100 hover:text-slate-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <IconPlus />
          <span className="sr-only">Increment</span>
        </Button>
      </Group>
    </NumberField>
  );
};
