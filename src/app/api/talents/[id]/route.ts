import { NextResponse } from 'next/server';
import * as talentService from '@/lib/services/talentService';
import { talentSchema } from '@/lib/validations/talent';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = context.params;

    const talent = await talentService.getTalentById(id);

    if (!talent) {
      return NextResponse.json({ message: 'Talento no encontrado.' }, { status: 404 });
    }

    return NextResponse.json(talent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ocurrió un error al obtener el talento.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id } = context.params;
    const body = await request.json();

    const validation = talentSchema.partial().safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.error.format() }, { status: 400 });
    }

    const updatedTalent = await talentService.updateTalent(id, validation.data);

    return NextResponse.json(updatedTalent);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ocurrió un error al actualizar el talento.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const { id } = context.params;

    await talentService.deleteTalent(id);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Ocurrió un error al eliminar el talento.' },
      { status: 500 }
    );
  }
}
