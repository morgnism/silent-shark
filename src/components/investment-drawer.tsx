'use client';

import investInVendor from '@/app/actions/investment-in-vendor';
import { Event, Vendor } from '@/lib/types';
import { formatDateLong } from '@/utils/date-time-utils';
import { CirclePlus, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import ConfirmationDrawer from './confirmation-drawer';
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
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

type BidDrawerProps = {
  /* Current event */
  event: Event;
  /* List of vendor startups */
  vendors: Vendor[];
  /* Amount of available investment funds */
  availableToInvest: number;
};

const multipliers = [100, 1000, 10000, 100000];
const INITIAL_MULTIPLIER_VALUE = multipliers[0];
const INITIAL_MULTIPLIER_BTN_INDEX = 0;

const MIN_SPEND_LIMIT = 0;
const MAX_SPEND_LIMIT = 1000000;

const InvestmentDrawer = ({
  event,
  vendors,
  availableToInvest = MAX_SPEND_LIMIT,
}: BidDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [maxInvestmentAvailable, setMaxInvestmentAvailable] = useState(
    MAX_SPEND_LIMIT - availableToInvest,
  );
  const [currentInvestment, setCurrentInvestment] = useState(0);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | undefined>(
    undefined,
  );
  const [multiplier, setMultiplierValue] = useState(INITIAL_MULTIPLIER_VALUE);
  const [activeMultiplierBtnIndex, setActiveMultiplierBtnIndex] = useState(
    INITIAL_MULTIPLIER_BTN_INDEX,
  );
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const { toast } = useToast();
  const { refresh } = useRouter();

  const onValueAdjusterClick = (adjustment: number) => {
    const total = Math.max(
      MIN_SPEND_LIMIT,
      Math.min(MAX_SPEND_LIMIT, currentInvestment + adjustment),
    );
    setCurrentInvestment(total);
    // setMaxInvestmentAvailable(maxInvestmentAvailable - total);
  };

  const onMultiplierValueChange = (value: number, index: number) => {
    setMultiplierValue(value);
    setActiveMultiplierBtnIndex(index);
  };

  const onSliderValueChange = (value: number[]) => {
    const total = value[0];
    setCurrentInvestment(total);
    // setMaxInvestmentAvailable(maxInvestmentAvailable - total);
  };

  const onBusinessSelectorValueChange = (value: string) => {
    const vendor = vendors.find((vendor) => vendor.id === value);
    setSelectedVendor(vendor);
  };

  const onConfirmationDrawerOpen = (value: boolean) => {
    if (!!currentInvestment && !!selectedVendor && value) {
      setIsConfirmationOpen(true);
    }
  };

  const onConfirmationDrawerClose = () => {
    setIsConfirmationOpen(false);
  };

  const resetValues = () => {
    setCurrentInvestment(0);
    setSelectedVendor(undefined);
    setMultiplierValue(INITIAL_MULTIPLIER_VALUE);
    setActiveMultiplierBtnIndex(0);
  };

  const onSubmit = async () => {
    const state = await investInVendor({
      event,
      amount: currentInvestment,
      vendor_id: selectedVendor?.id as string,
      vendor_name: selectedVendor?.name as string,
    });

    toast({
      title: JSON.parse(state).message,
      description: (
        <>
          <p className="text-muted-foreground">
            Invested{' '}
            <span className="text-foreground">${currentInvestment}</span> in{' '}
            <span className="text-foreground">{selectedVendor?.name}</span>
          </p>
          <p className="text-muted-foreground"> at {formatDateLong()}</p>
        </>
      ),
    });

    onConfirmationDrawerClose();
    resetValues();
    setOpen(false);
    setTimeout(() => {
      refresh();
    }, 2000);
  };

  return (
    <Drawer dismissible={false} open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full" asChild>
        <Button variant="ghost" className="h-12 w-full">
          <CirclePlus className="h-6 w-6" />
          <span className="sr-only">Invest in a Business</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Place an Investment</DrawerTitle>
            <DrawerDescription className="flex flex-col">
              <span>Choose how much to invest in a business.</span>
              <span>
                You have{' '}
                <span className="font-semibold text-foreground">
                  {maxInvestmentAvailable}
                </span>{' '}
                available to bid.
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onValueAdjusterClick(-multiplier)}
                disabled={currentInvestment <= MIN_SPEND_LIMIT}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {currentInvestment}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onValueAdjusterClick(multiplier)}
                disabled={currentInvestment >= MAX_SPEND_LIMIT}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-10 flex w-full">
              <Slider
                defaultValue={[MIN_SPEND_LIMIT]}
                value={[currentInvestment]}
                max={maxInvestmentAvailable}
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
                    activeMultiplierBtnIndex === index ? 'secondary' : 'outline'
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
                    {vendors.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
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
              description={`You're about to invest \$${currentInvestment}. Are you sure?`}
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
