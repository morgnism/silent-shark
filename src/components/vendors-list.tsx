import { Vendor } from '@/lib/types';
import SmallAvatar from './small-avatar';
import { Card, CardContent, CardHeader } from './ui/card';

type VendorsListProps = {
  vendors: Vendor[];
  emptyMessage: string | JSX.Element;
};

const compareVendorsFn = (a: Vendor, b: Vendor): number =>
  b.total_invested - a.total_invested;

const VendorsList = ({ vendors, emptyMessage }: VendorsListProps) =>
  vendors.length ? (
    <div className="mt-3 grid w-full gap-4">
      {vendors
        .sort(compareVendorsFn)
        .map(({ id, image_url, name, total_invested }) => (
          <Card key={id} className="flex border-none shadow-none">
            <CardHeader className="mr-4 p-0">
              <SmallAvatar name={name} image_url={image_url} />
            </CardHeader>
            <CardContent className="flex w-full flex-col items-start p-0">
              <p className="text-muted-foreground">
                <span className="text-foreground">${total_invested || 0}</span>{' '}
                invested this event
              </p>
              <p className="text-muted-foreground">
                to <span className="text-foreground">{name}</span>
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  ) : (
    emptyMessage
  );

export default VendorsList;
