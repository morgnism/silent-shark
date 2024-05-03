import { CircleAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type NoticeProps = {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | null | undefined;
};

const Notice = ({
  title = 'Heads up!',
  description,
  variant = 'default',
}: NoticeProps) => {
  return (
    <Alert variant={variant}>
      <CircleAlert className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default Notice;
