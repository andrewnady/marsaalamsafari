import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon — brand tile with the Horizon Sun disc on Ocean Blue. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#005F99',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 108,
            height: 108,
            borderRadius: 54,
            overflow: 'hidden',
          }}
        >
          <div style={{ width: 108, height: 54, background: '#D4A24C' }} />
          <div style={{ width: 108, height: 54, background: '#0a3a5c' }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
