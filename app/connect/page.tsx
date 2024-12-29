import ConnectForm from 'components/connect/send-message';

export default function ConnectPage() {
  return (
    <>
      <div className="w-full">
        <div className="max-w-4xl px-6 py-20 sm:px-10 lg:px-0">
          <h1 className="pt-10 font-hta text-6xl uppercase">Let&apos;s Connect</h1>
          <p className="">leave us a message</p>
          <ConnectForm />
        </div>
      </div>
    </>
  );
}
