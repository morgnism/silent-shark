import { Vendor } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';

type VendorsListProps = {
  vendors: Vendor[];
  emptyMessage: string | JSX.Element;
};

const VendorsList = ({ vendors, emptyMessage }: VendorsListProps) =>
  vendors.length ? (
    <div className="mb-16 grid w-full gap-2">
      {vendors.map(({ $id, image_url, name, total_invested }) => (
        <Card key={$id} className="my-6 flex border-none shadow-none">
          <CardHeader className="mr-4 p-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={image_url || 'https://github.com/shadcn.png'} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="flex w-full flex-col items-start p-0">
            <p className="text-muted-foreground">
              ${total_invested} invested this event
            </p>
            <p className="text-muted-foreground">to /a vendor/</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    emptyMessage
  );

export default VendorsList;
