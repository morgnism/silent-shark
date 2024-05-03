'use server';

import { createAdminClient, ID, SESSION_KEY } from '@/lib/appwrite';
import { setSessionCookie } from '@/utils/cookies';
import { redirect } from 'next/navigation';
import { userAuthFormSchema } from './auth-form-schema';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export default async function loginWithEmail(data: FormData) {
  const formData = Object.fromEntries(data);
  const parsed = userAuthFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return JSON.stringify({
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    });
  }

  try {
    const { email, password } = parsed.data;
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setSessionCookie(SESSION_KEY, session);

    console.log(session);
    console.log({
      message: 'signin complete!',
      fields: parsed.data,
    });

    redirect('/events');
  } catch (error) {
    return JSON.stringify({
      message: 'signin failed...',
      fields: parsed.data,
      issues: [error],
    });
  }
}
