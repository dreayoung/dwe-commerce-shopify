export default async function Page({ params }: { params: { collection: string } }) {
  return (
    <section>
      <p className="px-20 pt-32 text-center font-hta text-3xl lg:text-6xl">{`No collectibles right now`}</p>
    </section>
  );
}
