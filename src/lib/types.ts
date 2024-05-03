export type Sponsor = {
  id: string;
  name: string;
};

export type SponsorDTO = {
  $id?: string;
  name: string;
};

export type Event = {
  id: string;
  name: string;
  description: string;
  start: string;
  end: string;
  image_url: string;
  total_invested: number;
  total_investors: number;
  highest_invested: number;
  vendors: Vendor[];
  // investments: Investment[];
  sponsors: Sponsor[];
  created_at: string;
  is_live: boolean;
};

export type EventDTO = {
  name: string;
  description: string;
  start: string;
  end: string;
  image_url: string;
  total_invested: number;
  total_investors: number;
  highest_invested: number;
  vendors: VendorDTO[];
  // investments: InvestmentDTO[];
  sponsors: SponsorDTO[];
  is_live: boolean;
};

export type Vendor = {
  id: string;
  name: string;
  description: string;
  website_url: string;
  image_url: string;
  total_invested: number;
  events?: Event[];
};

export type VendorDTO = {
  $id?: string;
  name?: string;
  description?: string;
  website_url?: string;
  image_url?: string;
  total_invested?: number;
};

export type Investment = {
  id: string;
  investor_id: string;
  investor_name: string;
  vendor_id: string;
  vendor_name: string;
  amount: number;
  created_at: string;
};

export type InvestmentDTO = {
  $id?: string;
  investor_id?: string;
  investor_name?: string;
  vendor_id?: string;
  vendor_name?: string;
  amount?: number;
};
