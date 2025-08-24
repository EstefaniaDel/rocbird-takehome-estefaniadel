import { NextResponse } from 'next/server';
import * as talentService from '@/lib/services/talentService';
import { talentSchema } from '@/lib/validations/talent';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const result = await talentService.getTalentsList(page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ocurrió un error al obtener los talentos.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = talentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }
    const newTalent = await talentService.createTalent(validation.data);

    return NextResponse.json(newTalent, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ocurrió un error al crear el talento.' },
      { status: 500 }
    );
  }
}
