'use client';

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

type ConfirmationDrawerProps = {
  description: string;
  isConfirmationOpen: boolean;
  setIsConfirmationOpen: (value: boolean) => void;
  onConfirmationSubmitAction: () => void;
  onConfirmationCloseAction: () => void;
};

const ConfirmationDrawer = ({
  description,
  isConfirmationOpen,
  setIsConfirmationOpen,
  onConfirmationSubmitAction,
  onConfirmationCloseAction,
}: ConfirmationDrawerProps) => {
  return (
    <Drawer
      dismissible={false}
      open={isConfirmationOpen}
      onOpenChange={setIsConfirmationOpen}
    >
      <DrawerTrigger className="w-full" asChild>
        <Button>Submit</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex flex-col items-center">
            <DrawerTitle>Confirm Investment</DrawerTitle>
            <DrawerDescription className="flex flex-col">
              <span>{description}</span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => onConfirmationSubmitAction()}>Submit</Button>
            <DrawerClose asChild>
              <Button
                onClick={() => onConfirmationCloseAction()}
                variant="outline"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmationDrawer;
