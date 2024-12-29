import { hasAccountId } from '@src/services/adsense.service';
import { auth } from '../../../../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const userId = (await auth())?.userId;

    if (!userId) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    const hasUser = await hasAccountId(userId);

    if (!hasUser) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
