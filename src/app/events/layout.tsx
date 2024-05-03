import MobileHeader from '@/components/mobile-header';
import { getLoggedInUser } from '@/lib/appwrite';
import { getEvents } from '@/lib/events-api';
import { getTotalInvestmentsByInvestorId } from '@/lib/investments-api';
import type { Metadata } from 'next';
import MobileFooter from '../../components/mobile-footer';

export const metadata: Metadata = {
  title: 'Silent Shark | Events',
  description: 'Silently Investment like a Shark Tank entrepreneur.',
};

export default async function EventsLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    eventId: string;
  };
}>) {
  const events = await getEvents();
  const liveEvent = events.find((event) => event.is_live);
  const user = await getLoggedInUser();
  const remainingToInvest = await getTotalInvestmentsByInvestorId(user!.$id);

  return (
    <div className="relative mx-auto min-h-screen max-w-screen-xl px-2.5 py-12">
      <MobileHeader />
      {children}
      <MobileFooter event={liveEvent} availableToInvest={remainingToInvest} />
    </div>
  );
}
