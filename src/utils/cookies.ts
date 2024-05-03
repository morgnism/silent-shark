'use server';

import { Models } from '@/lib/appwrite';
import { cookies } from 'next/headers';
import { millisecondsToSeconds } from './date-time-utils';

export const setSessionCookie = (
  sessionKey: string,
  session: Models.Session,
) => {
  cookies().set(sessionKey, session.secret, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: millisecondsToSeconds(new Date(session.expire).getTime()),
    path: '/',
  });
};
