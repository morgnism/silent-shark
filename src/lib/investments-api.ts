import { DATABASE_ID, COLLECTION_IDS } from './api-constants';
import { ID, Models, Query, createDatabaseClient } from './appwrite';
import { Investment, InvestmentDTO } from './types';

const mapInvestment = (
  investment: InvestmentDTO & Models.Document,
): Investment => ({
  id: investment.$id ?? '',
  created_at: investment.$createdAt ?? '',
  investor_id: investment.investor_id ?? '',
  investor_name: investment.investor_name ?? '',
  vendor_id: investment.vendor_id ?? '',
  vendor_name: investment.vendor_name ?? '',
  amount: investment.amount ?? 0,
});

const pullInvestments = (
  investments: Array<InvestmentDTO & Models.Document>,
) => (investments.length ? investments.map((i) => i.amount || 0) : [0]);

const calculateTotalInvested = (investments: number[]) =>
  investments.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

export async function getInvestmentsByEventId(
  eventId: string,
): Promise<Investment[]> {
  const { databases } = await createDatabaseClient();
  return await databases
    .listDocuments(DATABASE_ID, COLLECTION_IDS.investments, [
      Query.equal('event_id', eventId),
    ])
    .then((res) =>
      (res.documents as Array<InvestmentDTO & Models.Document>).map(
        mapInvestment,
      ),
    );
}

export async function getTotalInvestmentsByInvestorId(
  investorId: string,
): Promise<number> {
  const { databases } = await createDatabaseClient();
  return await databases
    .listDocuments(DATABASE_ID, COLLECTION_IDS.investments, [
      Query.equal('investor_id', investorId),
    ])
    .then((res) => {
      const mappedInvestments = pullInvestments(
        res.documents as Array<InvestmentDTO & Models.Document>,
      );
      return calculateTotalInvested(mappedInvestments);
    });
}

export async function createNewInvestment(
  data: InvestmentDTO,
): Promise<Investment> {
  const { databases } = await createDatabaseClient();
  return await databases
    .createDocument(DATABASE_ID, COLLECTION_IDS.investments, ID.unique(), data)
    .then((res) => mapInvestment(res));
}
