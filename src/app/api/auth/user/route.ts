import { createSessionClient } from '@/lib/appwrite';

export async function GET(request: Request) {
  const { account } = await createSessionClient();

  try {
    const user = await account.get();
    return Response.json({ user });
  } catch (error) {
    return Response.json(error);
  }
}
