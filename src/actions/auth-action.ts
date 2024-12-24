'use server';

import { auth, signOut } from '../../lib/auth';
import { revalidatePath } from 'next/cache';
import { connect } from '../../lib/prisma/client';

export async function logout() {
  await signOut();
  revalidatePath('/');
}

export async function withdrawal() {
  const session = await auth();
  const userId = session?.userId;

  if (!userId) return false;

  const { prisma, close } = await connect();
  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    close();
    revalidatePath('/');
  }
}
