import { Event } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type EventListProps = {
  events: Event[];
  emptyMessage: string | JSX.Element;
  className?: string;
};

const EventsList = ({ events, emptyMessage, className }: EventListProps) =>
  events.length ? (
    <div className={cn('mb-16 grid w-full grid-cols-2 gap-2', className)}>
      {events.map(({ $id, name, image_url }) => (
        <Link key={$id} href={`/events/${$id}`}>
          <Card>
            <CardHeader className="p-4">
              <div className="flex h-40 w-40 flex-col items-center">
                <img
                  className="aspect-square h-full rounded-md"
                  src={image_url || 'https://github.com/shadcn.png'}
                ></img>
              </div>
              <CardTitle className="text-md font-medium">{name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Date and time</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    emptyMessage
  );

export default EventsList;
