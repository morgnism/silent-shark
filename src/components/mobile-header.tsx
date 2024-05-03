import { createSessionClient, SESSION_KEY } from '@/lib/appwrite';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Button } from './ui/button';

type MobileHeader = {};

async function signOut() {
  'use server';

  const { account } = await createSessionClient();

  cookies().delete(SESSION_KEY);
  await account.deleteSession('current'); // logout on the current device only

  redirect('/signup');
}

const MobileHeader = async (props: MobileHeader) => {
  return (
    <div className="fixed top-0 flex w-screen items-center justify-evenly gap-2 bg-white">
      <form action={signOut}>
        <Button
          className="absolute right-4 top-4 md:right-8 md:top-8"
          variant="link"
          type="submit"
        >
          Logout
        </Button>
      </form>
    </div>
  );
};

export default MobileHeader;
