import { Models } from './appwrite';

export type Sponsor = {
  name: string;
} & Models.Document;

export type Event = {
  name: string;
  description: string;
  start: string;
  end: string;
  image_url: string;
  total_invested: number;
  total_investors: number;
  highest_invested: number;
  vendors: Vendor[];
  investments: Investment[];
  sponsors: Sponsor[];
} & Models.Document;

export type Vendor = {
  name: string;
  description: string;
  website_url: string;
  events: Event[];
  image_url: string;
  total_invested: number;
} & Models.Document;

export type Investment = {
  name: string;
  amount: number;
  investor_id: string;
} & Models.Document;
