import EventDetails from '@/views/events/EventDetails';

export default async function Page({ params }) {
  const slug = (await params).slug;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/events/${slug}`
  );
  const { data } = await res.json();

  return <EventDetails event={data} />;
}
