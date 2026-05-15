import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'GIANT PULSE';
  const category = searchParams.get('category') || 'DIGITAL ENGINE';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0A0F1E',
          padding: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '400px',
            backgroundColor: '#0066FF',
            opacity: 0.1,
            borderRadius: '100%',
            filter: 'blur(100px)',
            transform: 'translate(200px, -200px)',
          }}
        />
        <div
          style={{
            display: 'flex',
            backgroundColor: '#FF6B00',
            padding: '8px 20px',
            fontSize: '20px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '0.2em',
            marginBottom: '40px',
          }}
        >
          {category.toUpperCase()}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: '100px',
            fontWeight: 900,
            fontStyle: 'italic',
            color: 'white',
            lineHeight: 0.9,
            letterSpacing: '-0.05em',
            maxWidth: '900px',
            textTransform: 'uppercase',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '60px',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#0066FF',
              marginRight: '16px',
            }}
          />
          <div
            style={{
              fontSize: '24px',
              fontWeight: 900,
              color: '#64748B',
              letterSpacing: '0.4em',
            }}
          >
            GIANT PULSE MASTER ARCHIVE
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}