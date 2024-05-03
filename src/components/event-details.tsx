import { Sponsor } from '@/lib/types';
import { formatNormalDate } from '@/utils/date-time-utils';
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
  total_invested: number;
  total_investors: number;
  highest_invested: number;
  created_at: string;
};

const EventDetails = ({
  name,
  description,
  sponsors,
  total_invested,
  total_investors,
  highest_invested,
  created_at,
}: EventDetailsProps) => (
  <div className="mt-3 grid w-full gap-4">
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-2 p-0 pt-3">
        {/* {sponsors.length
          ? sponsors.map(({ id, name }) => (
              <div key={id} className="flex items-center">
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
          : null} */}
        {created_at && (
          <p className="text-sm text-muted-foreground">
            Created at: {formatNormalDate(created_at)}
          </p>
        )}
        {total_invested && (
          <p className="text-sm text-muted-foreground">
            Total invested: {total_invested}
          </p>
        )}
        {/* {highest_invested && (
          <p className="text-sm text-muted-foreground">
            Highest bid: {highest_invested}
          </p>
        )} */}
        {total_investors && (
          <p className="text-sm text-muted-foreground">
            Total investors: {total_investors}
          </p>
        )}
      </CardContent>
    </Card>
  </div>
);

export default EventDetails;
