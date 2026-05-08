'use client';

import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronRight, IconEye, IconEyeOff, IconUser } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLogin } from '../hooks/useLogin';
import { loginSchema, LoginSchema } from '../schema';

export const LoginForm: FC = () => {
  const loginMutation = useLogin();
  const [isVisible, setIsVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchema) => loginMutation.mutateAsync(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <Label
          htmlFor="username"
          className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-slate-400 uppercase"
        >
          Username
        </Label>
        <Controller
          name="username"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 text-sm font-semibold text-white transition-all outline-none placeholder:text-slate-600 has-[[data-slot=input-group-control]:focus-visible]:border-blue-500 has-[[data-slot=input-group-control]:focus-visible]:bg-white/10 has-[[data-slot=input-group-control]:focus-visible]:ring-4 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-500/10">
              <InputGroupInput
                id="username"
                {...field}
                placeholder="Enter your username"
                aria-invalid={!!fieldState.error}
              />
              <InputGroupAddon>{<IconUser className="size-5" />}</InputGroupAddon>
            </InputGroup>
          )}
        />
        <p className="mt-1 ml-1 h-5 text-[10px] font-black tracking-wider text-red-500 uppercase">
          {errors.username?.message}
        </p>
      </div>

      <div>
        <Label
          htmlFor="password"
          className="mb-2 ml-1 flex gap-1 text-xs font-semibold tracking-wider text-slate-400 uppercase"
        >
          Password
        </Label>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <InputGroup className="h-14 w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 text-sm font-semibold text-white transition-all outline-none placeholder:text-slate-600 has-[[data-slot=input-group-control]:focus-visible]:border-blue-500 has-[[data-slot=input-group-control]:focus-visible]:bg-white/10 has-[[data-slot=input-group-control]:focus-visible]:ring-4 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-500/10">
              <InputGroupInput
                id="password"
                {...field}
                placeholder="Enter your password"
                aria-invalid={!!fieldState.error}
                type={isVisible ? 'text' : 'password'}
              />
              <InputGroupAddon align="inline-end" className="p-0">
                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  onClick={() => setIsVisible((prevState) => !prevState)}
                  className="text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent hover:text-blue-500"
                >
                  {isVisible ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
                  <span className="sr-only">{isVisible ? 'Hide password' : 'Show password'}</span>
                </Button>
              </InputGroupAddon>
              <InputGroupAddon>{<IconUser className="size-5" />}</InputGroupAddon>
            </InputGroup>
          )}
        />
        <p className="mt-1 ml-1 h-5 text-[10px] font-black tracking-wider text-red-500 uppercase">
          {errors.password?.message}
        </p>
      </div>

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        className="relative mt-4 flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-blue-600 py-4 text-[13px] font-bold tracking-widest text-white uppercase transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50"
      >
        <span>Enter Control Center</span>
        <IconChevronRight className="size-4" />
      </Button>
    </form>
  );
};
