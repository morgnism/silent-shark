import { updateEvent } from '@/lib/events-api';
import { createSessionClient } from '@/lib/appwrite';

export async function PUT(request: Request) {
  const { eventId, data } = await request.json();
  await createSessionClient();

  try {
    const event = await updateEvent(eventId, data);
    return Response.json({ event });
  } catch (error) {
    return Response.json(error);
  }
}
