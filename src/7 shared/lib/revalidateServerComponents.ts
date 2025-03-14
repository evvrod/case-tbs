'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateServerComponents(path: string) {
  revalidatePath(path);
}
