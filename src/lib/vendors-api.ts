import { COLLECTION_IDS, DATABASE_ID } from './api-constants';
import { Models, createDatabaseClient } from './appwrite';
import { Vendor, VendorDTO } from './types';

const mapVendor = (vendor: VendorDTO & Models.Document): Vendor => ({
  id: vendor.$id ?? '',
  name: vendor.name ?? '',
  description: vendor.description ?? '',
  website_url: vendor.website_url ?? '',
  image_url: vendor.image_url ?? '',
  total_invested: vendor.total_invested ?? 0,
});

export async function getVendor(vendorId: string): Promise<Vendor> {
  const { databases } = await createDatabaseClient();
  return await databases
    .getDocument(DATABASE_ID, COLLECTION_IDS.vendors, vendorId)
    .then((res) => mapVendor(res));
}

export async function updateVendor(
  vendorId: string,
  data: VendorDTO,
): Promise<Vendor> {
  const { databases } = await createDatabaseClient();
  return await databases
    .updateDocument(DATABASE_ID, COLLECTION_IDS.vendors, vendorId, data)
    .then((res) => mapVendor(res));
}
