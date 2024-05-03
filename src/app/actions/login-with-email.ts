'use server';

import { createSessionClient, SESSION_KEY } from '@/lib/appwrite';
import { setSessionCookie } from '@/utils/cookies';
import { redirect } from 'next/navigation';
import { userAuthFormSchema } from './auth-form-schema';

export type LoginFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  error?: boolean;
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
    const { account } = await createSessionClient();
    const session = await account.createEmailPasswordSession(email, password);

    setSessionCookie(SESSION_KEY, session);

    console.log(session);
    console.log({
      message: 'signin complete!',
    });

    redirect('/events');
  } catch (error) {
    console.log(error);
    return JSON.stringify({
      message: 'No user found with this email.',
      fields: parsed.data,
      issues: [error],
      error: true,
    });
  }
}
