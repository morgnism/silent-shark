import { CirclePlus, Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type MobileMenuProps = {
  eventId?: string;
};

const MobileMenu = ({ eventId }: MobileMenuProps) => {
  return (
    <div className="fixed bottom-0 flex w-screen items-center justify-evenly gap-2 bg-white">
      <Link className="w-full" href="/">
        <Button variant="ghost" className="h-12 w-full">
          <Home className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Button>
      </Link>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Link
        className="w-full"
        href={eventId ? `/${eventId}?drawer_open=true` : ''}
      >
        <Button variant="ghost" className="h-12 w-full">
          <CirclePlus className="h-6 w-6" />
          <span className="sr-only">Investment in Business</span>
        </Button>
      </Link>
      <Separator orientation="vertical" className="mx-1 h-6" />
      <Link className="w-full" href="/">
        <Button variant="ghost" className="h-12 w-full">
          <Settings className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </Button>
      </Link>
    </div>
  );
};

export default MobileMenu;
