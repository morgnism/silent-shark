'use client';

import { Event } from '@/lib/types';
import { Home, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import InvestmentDrawer from './investment-drawer';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Toaster } from './ui/toaster';

type MobileMenuProps = {
  event?: Event;
  availableToInvest: number;
};

const MobileFooter = ({ event, availableToInvest }: MobileMenuProps) => {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const isEventIdPath = parts.length >= 3;

  return (
    <>
      <div className="fixed bottom-0 flex w-screen items-center justify-evenly gap-2 bg-white">
        <Link className="w-full" href="/">
          <Button variant="ghost" className="h-12 w-full">
            <Home className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Button>
        </Link>
        {isEventIdPath && event && (
          <>
            <Separator orientation="vertical" className="mx-1 h-6" />
            <InvestmentDrawer
              event={event}
              vendors={event.vendors}
              availableToInvest={availableToInvest}
            />
          </>
        )}
        <Separator orientation="vertical" className="mx-1 h-6" />
        <Link className="w-full" href="">
          <Button variant="ghost" className="h-12 w-full">
            <Settings className="h-6 w-6" />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MobileFooter;
