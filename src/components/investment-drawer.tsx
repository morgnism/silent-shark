'use client';

import { Vendor } from '@/lib/types';
import { Minus, Plus } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Slider } from './ui/slider';
import ConfirmationDrawer from './confirmation-drawer';

type BidDrawerProps = {
  /* Current event id */
  eventId: string;
  /* List of vendor startups */
  vendors: Vendor[];
  /* Amount of available investment funds */
  remainingInvestment?: number;
};

const multipliers = [100, 1000, 10000, 100000];
const INITIAL_MULTIPLIER_VALUE = multipliers[0];

const MIN_SPEND_LIMIT = 0;
const MAX_SPEND_LIMIT = 1000000;

const InvestmentDrawer = ({
  eventId,
  vendors,
  remainingInvestment = MAX_SPEND_LIMIT,
}: BidDrawerProps) => {
  const searchParams = useSearchParams();
  const isDrawerQueryOpen = searchParams.get('drawer_open') === 'true';
  const [open, setOpen] = useState(isDrawerQueryOpen);
  const [availableToBid, setAvailableToBid] = useState(remainingInvestment);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState('');
  const [multiplier, setMultiplierValue] = useState(INITIAL_MULTIPLIER_VALUE);
  const [activeMultiplierIndex, setActiveMultiplierIndex] = useState(0);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  // const [isSubmitActionClick, setIsSubmitActionClicked] = useState(false);

  const onClick = (adjustment: number) => {
    setCurrentBid(
      Math.max(
        MIN_SPEND_LIMIT,
        Math.min(MAX_SPEND_LIMIT, currentBid + adjustment),
      ),
    );
  };

  const onMultiplierValueChange = (value: number, index: number) => {
    setMultiplierValue(value);
    setActiveMultiplierIndex(index);
  };

  const onSliderValueChange = (value: number[]) => {
    setCurrentBid(value[0]);
  };

  const onBusinessSelectorValueChange = (value: string) => {
    setSelectedVendor(value);
  };

  const onConfirmationDrawerOpen = (value: boolean) => {
    if (!!currentBid && !!selectedVendor && value) {
      setIsConfirmationOpen(true);
    }
  };

  const onConfirmationDrawerClose = () => {
    setIsConfirmationOpen(false);
  };

  const resetValues = () => {
    setCurrentBid(0);
    setSelectedVendor('');
    setMultiplierValue(INITIAL_MULTIPLIER_VALUE);
    if (isDrawerQueryOpen) {
      window.history.replaceState(null, '', `/${eventId}`);
    }
  };

  const onSubmit = () => {
    onConfirmationDrawerClose();
    resetValues();
    setOpen(false);
  };

  return (
    <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full" asChild>
        <Button variant="outline">Place an Investment</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Place an Investment</DrawerTitle>
            <DrawerDescription className="flex flex-col">
              <p>Choose how much to invest in a business.</p>
              <p>
                You have{' '}
                <span className="font-semibold text-foreground">
                  {availableToBid}
                </span>{' '}
                available to bid.
              </p>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-multiplier)}
                disabled={currentBid <= MIN_SPEND_LIMIT}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {currentBid}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(multiplier)}
                disabled={currentBid >= MAX_SPEND_LIMIT}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-10 flex w-full">
              <Slider
                defaultValue={[MIN_SPEND_LIMIT]}
                value={[currentBid]}
                max={availableToBid}
                step={multiplier}
                onValueChange={onSliderValueChange}
              />
            </div>
            <div className="mt-10 grid grid-cols-2 gap-2">
              {multipliers.map((value, index) => (
                <Button
                  key={index}
                  onClick={() => onMultiplierValueChange(value, index)}
                  variant={
                    activeMultiplierIndex === index ? 'secondary' : 'outline'
                  }
                >
                  x{value}
                </Button>
              ))}
            </div>
            <div className="mt-5">
              <Select onValueChange={onBusinessSelectorValueChange}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Select a business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {vendors.map(({ $id, name }) => (
                      <SelectItem key={$id} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DrawerFooter>
            <ConfirmationDrawer
              description={`You're about to invest \$${currentBid}. Are you sure?`}
              isConfirmationOpen={isConfirmationOpen}
              setIsConfirmationOpen={onConfirmationDrawerOpen}
              onConfirmationSubmitAction={onSubmit}
              onConfirmationCloseAction={onConfirmationDrawerClose}
            />

            <DrawerClose asChild>
              <Button onClick={resetValues} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default InvestmentDrawer;
