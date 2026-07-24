import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Favicon — the Horizon Sun disc (rays drop away at this scale per brand). */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F2E7C9',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 24,
            height: 24,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <div style={{ width: 24, height: 12, background: '#D4A24C' }} />
          <div style={{ width: 24, height: 12, background: '#005F99' }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
