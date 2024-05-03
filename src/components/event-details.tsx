import { Sponsor } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

type EventDetailsProps = {
  name: string;
  description: string;
  sponsors: Sponsor[];
  totalBids: number;
  totalBidders: number;
  highestBid: number;
};

const EventDetails = ({
  name,
  description,
  sponsors,
  totalBids,
  totalBidders,
  highestBid,
}: EventDetailsProps) => (
  <div className="mb-16 grid w-full gap-2">
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-2 p-0 pt-6">
        {sponsors.length
          ? sponsors.map(({ $id, name }) => (
              <div key={$id} className="flex items-center">
                <Avatar className="mr-2.5 h-12 w-12">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>
                  <span className="text-muted-foreground">Sponsored by </span>
                  {name}
                </p>
              </div>
            ))
          : null}
        {totalBids && (
          <p className="text-muted-foreground">Total bids: {totalBids}</p>
        )}
        {highestBid && (
          <p className="text-muted-foreground">Highest bid: {highestBid}</p>
        )}
        {totalBidders && (
          <p className="text-muted-foreground">Attendees: {totalBidders}</p>
        )}
      </CardContent>
    </Card>
  </div>
);

export default EventDetails;
