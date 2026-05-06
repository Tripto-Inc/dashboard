'use client';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { IconChevronRight, IconLock, IconUser } from '@tabler/icons-react';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { LoginFormData } from '../types';

export const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => loginMutation.mutateAsync(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label
          htmlFor="username"
          className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-slate-300 uppercase"
        >
          <span>Username</span>
        </Label>

        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup className="h-13.5 w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 text-sm font-semibold text-white transition-all outline-none placeholder:text-slate-600">
              <InputGroupInput
                id="username"
                {...field}
                placeholder="Enter an username"
                aria-invalid={!!fieldState.error}
              />
              <InputGroupAddon>
                <IconUser className="size-5" />
              </InputGroupAddon>
            </InputGroup>
          )}
        />

        <p className="mt-1 ml-1 h-5 text-xs text-red-500">{errors.username?.message}</p>
      </div>

      <div>
        <Label
          htmlFor="password"
          className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-slate-300 uppercase"
        >
          Password
        </Label>

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup className="h-13.5 w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 text-sm font-semibold text-white transition-all outline-none placeholder:text-slate-600">
              <InputGroupInput
                id="password"
                {...field}
                placeholder="Enter a password"
                aria-invalid={!!fieldState.error}
              />
              <InputGroupAddon>
                <IconLock className="size-5" />
              </InputGroupAddon>
            </InputGroup>
          )}
        />

        <p className="mt-1 ml-1 h-5 text-xs text-red-500">{errors.password?.message}</p>
      </div>

      <Button
        type="submit"
        className="relative mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 text-sm font-bold uppercase"
      >
        <span>Enter Control Center</span>
        <IconChevronRight className="size-4" />
      </Button>
    </form>
  );
};
