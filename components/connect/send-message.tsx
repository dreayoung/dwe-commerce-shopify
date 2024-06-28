'use client';

import LoadingDots from 'components/loading-dots';
import { sendMail } from 'lib/mail';
import { useState } from 'react';

export default function ConnectForm() {
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [messageFail, setMessageFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const { name, email, message } = values;

  const handleChange = (e: any) => setValues({ ...values, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const resp = await sendMail({ emailContent: values });

    resp?.accepted ? setMessageSuccess(true) : setMessageFail(true);
    setLoading(false);

    setValues({
      name: '',
      email: '',
      message: ''
    });
  };

  const inputC =
    'bg-transparent tracking-widest border-[1px] border-neutral-800 p-4 rounded-lg placeholder:text-neutral-400 text-sm focus-visible:outline-none';

  return (
    <form onSubmit={handleSubmit} className="mt-14 grid gap-4">
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <input
          required
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className={`${inputC} w-full`}
          placeholder="name"
        />
        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className={`${inputC} w-full`}
          placeholder="email"
        />
      </div>
      <textarea
        required
        name="message"
        value={message}
        onChange={handleChange}
        className={`${inputC} h-40`}
        placeholder="Hey hero! I know you are busy saving the community but..."
      />
      <button
        className="rounded-2xl bg-off_white/80 p-4 font-bold uppercase tracking-widest text-black hover:bg-white"
        type="submit"
      >
        {!loading ? 'Send' : <LoadingDots className="bg-black" />}
      </button>
      {messageSuccess ? (
        <div className="text-htfgreen text-center text-xs brightness-125">
          ✔️ your message has been sent
        </div>
      ) : messageFail ? (
        <div className="text-center text-xs brightness-125">
          x something went wrong. please check all fields and try again. <br /> or contact me
          manually connect@herotoall.io
        </div>
      ) : null}
    </form>
  );
}
