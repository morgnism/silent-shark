import { COLLECTION_IDS, DATABASE_ID } from './api-constants';
import { Models, createDatabaseClient } from './appwrite';
import {
  Event,
  EventDTO,
  Investment,
  InvestmentDTO,
  Sponsor,
  SponsorDTO,
  Vendor,
  VendorDTO,
} from './types';

const mapEvent = (event: EventDTO & Models.Document): Event => ({
  id: event.$id,
  created_at: event.$createdAt,
  name: event.name,
  description: event.description,
  start: event.start,
  end: event.end,
  image_url: event.image_url,
  total_invested: event.total_invested,
  total_investors: event.total_investors,
  highest_invested: event.highest_invested,
  is_live: event.is_live,
  vendors: mapVendors(event.vendors as Array<VendorDTO & Models.Document>),
  // investments: mapInvestments(
  //   event.investments as Array<InvestmentDTO & Models.Document>,
  // ),
  sponsors: mapSponsors(event.sponsors as Array<SponsorDTO & Models.Document>),
});

const mapVendors = (vendors: Array<VendorDTO & Models.Document>): Vendor[] =>
  vendors.map((vendor) => ({
    id: vendor.$id ?? '',
    name: vendor.name ?? '',
    description: vendor.description ?? '',
    website_url: vendor.website_url ?? '',
    image_url: vendor.image_url ?? '',
    total_invested: vendor.total_invested ?? 0,
  }));

const mapInvestments = (
  investments: Array<InvestmentDTO & Models.Document>,
): Investment[] =>
  investments.map((investment) => ({
    id: investment.$id ?? '',
    created_at: investment.$createdAt ?? '',
    investor_id: investment.investor_id ?? '',
    investor_name: investment.investor_name ?? '',
    vendor_id: investment.vendor_id ?? '',
    vendor_name: investment.vendor_name ?? '',
    amount: investment.amount ?? 0,
  }));

const mapSponsors = (
  sponsors: Array<SponsorDTO & Models.Document>,
): Sponsor[] =>
  sponsors.map((sponsor) => ({
    id: sponsor.$id,
    name: sponsor.name,
  }));

export async function getEvents(): Promise<Event[]> {
  const { databases } = await createDatabaseClient();
  return await databases
    .listDocuments(DATABASE_ID, COLLECTION_IDS.events)
    .then((res) =>
      (res.documents as Array<EventDTO & Models.Document>).map(mapEvent),
    );
}

export async function getEvent(eventId: string): Promise<Event> {
  const { databases } = await createDatabaseClient();
  return await databases
    .getDocument(DATABASE_ID, COLLECTION_IDS.events, eventId)
    .then((res) => mapEvent(res as EventDTO & Models.Document));
}

export async function updateEvent(
  eventId: string,
  data: Partial<EventDTO>,
): Promise<Event> {
  const { databases } = await createDatabaseClient();
  return await databases
    .updateDocument(DATABASE_ID, COLLECTION_IDS.events, eventId, data)
    .then((res) => mapEvent(res as EventDTO & Models.Document));
}
