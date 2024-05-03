import { Models } from 'node-appwrite';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardHeader } from './ui/card';
import { Investment } from '@/lib/types';

type InvestmentsListProps = {
  investments: Investment[];
  emptyMessage: string | JSX.Element;
};

const InvestmentsList = ({
  investments,
  emptyMessage,
}: InvestmentsListProps) =>
  investments.length ? (
    <div className="mb-16 grid w-full gap-2">
      {investments.map(({ $id, $createdAt, amount }) => (
        <Card key={$id} className="my-6 flex border-none shadow-none">
          <CardHeader className="mr-4 p-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="flex w-full flex-col items-start p-0">
            <p className="text-muted-foreground">
              Investment listed for ${amount} {$createdAt}
            </p>
            <p className="text-muted-foreground">by /a username/</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    emptyMessage
  );

export default InvestmentsList;
