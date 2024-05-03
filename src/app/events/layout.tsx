import MobileMenu from '@/components/mobile-menu';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Silent Shark | Events',
  description: 'Silently Investment like a Shark Tank entrepreneur.',
};

export default async function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const events = await getEvents();
  // const liveEvent = events.find((event) =>
  //   isEventLive(event.start, event.end),
  // )?.$id;

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-xl px-2.5 py-12">
      {children}
      <MobileMenu />
    </div>
  );
}
