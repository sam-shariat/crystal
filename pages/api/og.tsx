import { ImageResponse } from '@vercel/og';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const OgImageHandler = async (req:NextRequest) => {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Venom ID';
  const w = searchParams.get('w') || '36';
  const image = searchParams.get('image') || 'Venom ID';
  const subtitle = searchParams.get('subtitle') || 'Empower Your Digital Presence with a Single Link';
  const fontData = await fetch(
    new URL('../../assets/fonts/PoppinsBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());
  // const blob = await response.blob();
  // const url = URL.createObjectURL(blob);
  //console.log(url)

  return new ImageResponse(
    (
      <div
        style={{
          background: 'radial-gradient(farthest-corner at 60% 55%, #1a1b19 10%, #1f191f 45%, #1f1b1f 60%, #1e2421 90%)',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          display: 'flex',
          gap:'24px'
        }}>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
          }}>
            {title !== '' && <p
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              fontFamily: '"Poppins"',
              lineHeight: 1.1,
              color: '#f5f5f5'
            }}>
            {title}
          </p>}
          {subtitle !== '' && <p
            style={{
              fontSize: 32,
              lineHeight: 1.1,
              fontFamily: '"Poppins"',
              color: '#acacac'
            }}>
            {subtitle}
          </p>}          
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={title}
          width={`${w}%`}
          height={'50%'}
          src={image}
          style={{ margin: '0 25px' }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
};

export default OgImageHandler;
