// app/api/download-cv/route.ts
import { readFileSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get('lang') || 'en';

        const validLangs = ['id', 'en'];
        const selectedLang = validLangs.includes(lang) ? lang : 'en';

        const fileName = selectedLang === 'id' ? 'CV_DION-FIRMANSYAH_ID.pdf' : 'CV_DION-FIRMANSYAH_EN.pdf';

        const filePath = join(process.cwd(), 'private', 'cv', fileName);

        const fileBuffer = readFileSync(filePath);

        console.log(`CV downloaded: ${fileName} at ${new Date().toISOString()}`);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Content-Length': fileBuffer.length.toString(),
            },
        });
    } catch (error) {
        console.error('CV download error:', error);
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
}
