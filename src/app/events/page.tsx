import EventsList from '@/components/events-list';
import SectionHeader from '@/components/section-header';
import { getLoggedInUser } from '@/lib/appwrite';
import { getEvents } from '@/lib/events-api';
import { redirect } from 'next/navigation';

export default async function EventsPage() {
  const user = await getLoggedInUser();

  if (!user) redirect('/signup');

  const events = await getEvents();
  const eventId = events.find((event) => event.is_live)?.id;

  return (
    <>
      <header className="px-3 pt-12 text-left">
        <h1 className="font-color-h1 mb-4 text-3xl font-bold leading-tight">
          <a href="/">Discover and invest in extraordinary startups</a>
        </h1>
        <p className="mb-2 mt-0 max-w-md">
          Invest on the Silent Shark marketplace
        </p>
      </header>
      <section className="pt-12">
        <SectionHeader
          eyebrow="Investing"
          heading="Live Events"
          href={`/events/${eventId}`}
          linkMessage="View live tank"
        />
        <EventsList
          className="mt-5"
          events={events}
          emptyMessage={
            <div className="text-center">
              No live event started! Next event is A Date in the future.
            </div>
          }
        />
      </section>
      {/* <section className="pt-12">
        <SectionHeader eyebrow="Tanks" heading="Upcoming Events" />
        <EventsList
          events={[]}
          emptyMessage={
            <div className="mt-5 text-center">No upcoming events!</div>
          }
        />
      </section>
      <section className="pt-12">
        <SectionHeader eyebrow="History" heading="Past Events" />
        <EventsList
          events={[]}
          emptyMessage={<div className="text-center">No past events yet!</div>}
        />
      </section> */}
    </>
  );
}
