import { Investment } from '@/lib/types';
import { formatDateDistance } from '@/utils/date-time-utils';
import SmallAvatar from './small-avatar';
import { Card, CardContent, CardHeader } from './ui/card';

type InvestmentsListProps = {
  investments: Investment[];
  emptyMessage: string | JSX.Element;
};

const compareInvestmentsFn = (a: Investment, b: Investment): number =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

const InvestmentsList = ({
  investments,
  emptyMessage,
}: InvestmentsListProps) =>
  investments.length ? (
    <div className="mt-3 grid w-full gap-4">
      {investments
        .sort(compareInvestmentsFn)
        .map(({ id, created_at, investor_name, vendor_name, amount }) => (
          <Card key={id} className="flex border-none shadow-none">
            <CardHeader className="mr-4 p-0">
              <SmallAvatar name={investor_name} />
            </CardHeader>
            <CardContent className="flex w-full flex-col items-start p-0">
              <p className="text-muted-foreground">
                <span className="text-foreground">{investor_name}</span>{' '}
                invested <span className="text-foreground">${amount}</span>
              </p>
              <p className="text-muted-foreground">
                in <span className="text-foreground">{vendor_name}</span>{' '}
                {formatDateDistance(created_at)}
              </p>
            </CardContent>
          </Card>
        ))}
    </div>
  ) : (
    emptyMessage
  );

export default InvestmentsList;
