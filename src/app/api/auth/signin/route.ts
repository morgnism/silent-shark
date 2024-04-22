import { SESSION_KEY, createAdminClient } from '@/lib/appwrite';
import { cookies } from 'next/headers';

const millisecondsToSeconds = (milliseconds: number) =>
  Math.floor(milliseconds / 1000);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    console.log(session);
    cookies().set(SESSION_KEY, session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: millisecondsToSeconds(new Date(session.expire).getTime()),
      path: '/',
    });

    return Response.json({ msg: 'signin complete!' });
  } catch (error) {
    return Response.json(error);
  }
}
