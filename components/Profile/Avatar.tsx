import { ComponentType } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';

const ImageMotion = motion<MotionProps | ImageProps>(Image as ComponentType);
interface Props {
  url: string;
  alt?: string;
  noanimate?: boolean;
  nodrag?: boolean;
  isNft?: boolean;
  my?: number | string;
  maxH?: number | string;
  radius?: number | string;
  shadow?: string;
}
const Avatar = ({
  url,
  alt,
  noanimate,
  nodrag,
  isNft,
  my,
  shadow,
  maxH,
  radius
}: Props) => {
  return (
    <ImageMotion
      initial={{ scale: !noanimate ? 0.96 : 1 }}
      animate={!noanimate ? { scale: 1 } : 'none'}
      transition={
        !noanimate
          ? {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }
          : {}
      }
      drag={!nodrag}
      dragDirectionLock={!nodrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      borderRadius={!isNft ? (radius ? radius : '100%') : 'none'}
      whileTap={{ cursor: 'grabbing' }}
      src={url.length > 10 ? url : '/logos/vidicon.jpg'}
      width="100%"
      maxH={maxH ? maxH : 'auto'}
      boxShadow={shadow ? shadow : 'none'}
      my={my ? my : 4}
      zIndex={100}
      alt={alt ? alt : 'VID Profile Image'}
      style={{
        maskImage: isNft ? 'url(/logos/hex.svg)' : 'none',
        WebkitMaskImage: isNft ? 'url(/logos/hex.svg)' : 'none',
        maskSize: 'contain',
        WebkitMaskSize: 'contain'
      }}
      textAlign={'center'}
    />
  );
};

export default Avatar;
