import getEnv from '@/utils/get-env';
import { cookies } from 'next/headers';
import { Account, Client } from 'node-appwrite';

export const API_ENDPOINT = getEnv('NEXT_PUBLIC_APPWRITE_ENDPOINT');
export const PROJECT_ID = getEnv('NEXT_PUBLIC_APPWRITE_PROJECT_ID');
export const API_KEY = getEnv('NEXT_APPWRITE_KEY');

export const SESSION_KEY = 'my-custom-session';

export async function createSessionClient() {
  const client = new Client().setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

  const session = cookies().get(SESSION_KEY);

  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID)
    .setKey(API_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
}
