import { LoginForm, LoginWithGoogleButton } from '@/features/authentication';
import { IconCompass } from '@tabler/icons-react';
import Image from 'next/image';

const LoginPage = async () => {
  return (
    <main className="min-h-screen font-sans">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <Image
            fill
            alt="Background"
            referrerPolicy="no-referrer"
            src="/images/login-background.jpg"
            className="h-full w-full object-cover opacity-20 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-tr from-[#020617] via-transparent to-blue-900/20" />
          <div className="absolute -top-1/4 -right-1/4 size-200 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 size-150 rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-lg p-6">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl md:p-14">
            <div className="mb-12 text-center">
              <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-yellow-400 text-blue-900 shadow-lg shadow-yellow-400/20">
                <IconCompass className="size-9" />
              </div>
              <h1 className="font-display mb-3 bg-linear-to-br from-white via-white to-white/50 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                Tripto
              </h1>
              <p className="font-medium text-slate-400">Mission control for global explorers.</p>
            </div>

            <div className="space-y-6">
              <LoginWithGoogleButton />

              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10"></div>
                <span className="text-[10px] font-black tracking-widest text-slate-500 uppercase">
                  Secure Access
                </span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>

              <LoginForm />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-black tracking-[0.15em] text-slate-600 uppercase">
            <span>System Status: Optimal</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            <span>v{process.env.version}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
