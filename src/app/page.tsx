import { getLoggedInUser } from '@/lib/appwrite';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const user = await getLoggedInUser();

  if (!user) redirect('/signup');

  redirect('/events');
}
