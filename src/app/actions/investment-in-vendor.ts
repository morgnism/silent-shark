'use server';

import { Models, getLoggedInUser } from '@/lib/appwrite';
import { updateEvent } from '@/lib/events-api';
import { createNewInvestment } from '@/lib/investments-api';
import { Event, EventDTO, VendorDTO } from '@/lib/types';
import { updateVendor } from '@/lib/vendors-api';

export default async function investInVendor(data: {
  event: Event;
  amount: number;
  vendor_id: string;
  vendor_name: string;
}) {
  const { event, amount, vendor_id, vendor_name } = data;
  const event_id = event.id;

  try {
    // create new investment
    const user = (await getLoggedInUser()) as Models.User<Models.Preferences>;
    const investor_id = user.$id;
    const investor_name = user.name;
    const investmentPayload = {
      amount,
      vendor_id,
      vendor_name,
      investor_id,
      investor_name,
      event_id,
    };

    // Update selected vendor
    const selectedVendor = event.vendors.find(
      (vendor) => vendor.id === vendor_id,
    )!;
    const vendorPayload: Partial<VendorDTO> = {
      name: vendor_name,
      total_invested: selectedVendor.total_invested + amount,
    };

    // Update current event
    const total_investors = event.total_investors + 1;
    const total_invested = event.total_invested + amount;
    // const highest_invested =
    //   getHighestInvestedAmount(investments) || amount;

    const eventPayload: Partial<EventDTO> = {
      total_invested,
      total_investors,
      highest_invested: 0,
    };

    await Promise.all([
      await createNewInvestment(investmentPayload),
      await updateVendor(vendor_id, vendorPayload),
      await updateEvent(event_id, eventPayload),
    ]);

    return JSON.stringify({
      message: 'Transaction complete!',
    });
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: JSON.stringify(error, null, 2),
    });
  }
}
