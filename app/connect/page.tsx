export default function ConnectPage() {
  const inputC = 'bg-transparent tracking-widest border-[1px] border-neutral-800 p-4 rounded-lg';

  return (
    <div className="w-full">
      <div className="mx-8 max-w-4xl py-20 pb-32 sm:mx-auto">
        <h1 className="pt-10 font-hta text-6xl uppercase">Let&apos;s Connect</h1>
        <p className="">leave me a message</p>
        <form className="mt-14 grid gap-4">
          <div className="flex items-center gap-4">
            <input className={`${inputC} w-full`} placeholder="name" />
            <input className={`${inputC} w-full`} placeholder="email" />
          </div>
          <textarea
            className={`${inputC} h-72`}
            placeholder="Hey hero! I know you are busy saving the community but..."
          />
          <button
            className="rounded-2xl bg-black p-4 font-bold uppercase tracking-widest"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
