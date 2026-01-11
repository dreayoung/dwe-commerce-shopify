'use client';

import LoadingDots from 'components/loading-dots';
import { sendMail } from 'lib/mail';
import { useActionState, useEffect, useRef } from 'react';

export default function ConnectForm() {
  const formRef = useRef<HTMLFormElement>(null);

  // useActionState handles the response and the loading (isPending) state
  const [state, formAction, isPending] = useActionState(sendMail, null);

  // Reset form when success is detected
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  const inputC =
    'bg-transparent tracking-widest border-[1px] border-neutral-800 p-4 rounded-lg placeholder:text-neutral-400 text-sm focus-visible:outline-none';

  return (
    <form ref={formRef} action={formAction} className="mt-14 grid gap-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <input
          required
          type="text"
          name="name" // match the formData.get('name') in the action
          className={`${inputC} w-full`}
          placeholder="name"
        />
        <input
          required
          type="email"
          name="email"
          className={`${inputC} w-full`}
          placeholder="email"
        />
      </div>
      <textarea
        required
        name="message"
        className={`${inputC} h-40`}
        placeholder="Hey hero! I know you are busy saving the community but..."
      />
      <button
        disabled={isPending}
        className="rounded-2xl bg-off_white/80 p-4 font-bold uppercase tracking-widest text-black hover:bg-white disabled:cursor-not-allowed"
        type="submit"
      >
        {!isPending ? 'Send' : <LoadingDots className="bg-black" />}
      </button>

      {state?.success && (
        <div className="text-center text-xs text-htf_green brightness-125">✔ {state.message}</div>
      )}

      {state?.success === false && (
        <div className="px-6 text-center text-xs brightness-125">
          x {state.message} or contact me manually{' '}
          <span className="font-bold text-off_white">connect@herotoall.io</span>
        </div>
      )}
    </form>
  );
}
