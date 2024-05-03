import EventDetails from '@/components/event-details';
import InvestmentsList from '@/components/investments-list';
import Notice from '@/components/notice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VendorsList from '@/components/vendors-list';
import { getEvent } from '@/lib/events-api';
import { getInvestmentsByEventId } from '@/lib/investments-api';

type EventPageProps = {
  params: {
    eventId: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const [event, investments] = await Promise.all([
    getEvent(params.eventId),
    getInvestmentsByEventId(params.eventId),
  ]);

  const {
    name,
    description,
    vendors,
    sponsors,
    total_invested,
    total_investors,
    highest_invested,
    image_url,
    created_at,
  } = event;

  return (
    <div className="">
      <div className="flex h-60 flex-col items-center rounded-md">
        <img className="aspect-square h-full" src={image_url}></img>
      </div>
      {/* <div className="px-3 pt-12">
        <div className="flex justify-center rounded-md bg-[#16151A] p-4 uppercase text-background">
          {event.end}
        </div>
      </div> */}
      <section className="w-full pt-12">
        <div className="px-3">
          <Tabs defaultValue="history" className="pt-10">
            <TabsList className="w-full">
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="vendors">Startups</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <InvestmentsList
                investments={investments}
                emptyMessage={
                  <Notice
                    title="This party is pretty bleak."
                    description="Start investing to kick things off!"
                  />
                }
              />
            </TabsContent>
            <TabsContent value="vendors">
              <VendorsList
                vendors={vendors}
                emptyMessage={
                  <div>
                    <h2>This party is pretty bleak.</h2>
                    <p>Start adding businesses to this event!</p>
                  </div>
                }
              />
            </TabsContent>
            <TabsContent value="details">
              <EventDetails
                {...{
                  name,
                  description,
                  sponsors,
                  total_invested,
                  total_investors,
                  highest_invested,
                  created_at,
                }}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
