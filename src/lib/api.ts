import { getDatabasesClient } from './appwrite';
import { Event } from './types';

const DATABASE_ID = 'tank';

export const enum COLLECTION_IDS {
  events = 'events',
  vendors = 'vendors',
  investment = 'investment',
  sponsors = 'sponsors',
}

export async function getEvents(): Promise<Event[]> {
  return await getDatabasesClient()
    .listDocuments(DATABASE_ID, COLLECTION_IDS.events)
    .then((res) => res.documents as Event[]);
}

export async function getEvent(eventId: string): Promise<Event> {
  return await getDatabasesClient()
    .getDocument(DATABASE_ID, COLLECTION_IDS.events, eventId)
    .then((res) => res as Event);
}
