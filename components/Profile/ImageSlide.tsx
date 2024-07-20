import { Button, Collapse, Flex, HStack, Image, Text } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface ImageSlideContextValue {
  images: string[] | null;
  captions: string[] | null;
  index: number;
  prevIndex: number;
  showCaptions?: boolean;
  controls?: boolean;
  rounded?: string;
}

const defaultValues: ImageSlideContextValue = {
  images: null,
  captions: null,
  index: 0,
  prevIndex: -1,
};

const ImageSlideContext = createContext<[ImageSlideContextValue, React.Dispatch<React.SetStateAction<ImageSlideContextValue>>]>([
  defaultValues,
  () => {},
]);

const ImageSlideController: React.FC<{ auto: number, controls: boolean }> = ({ auto, controls }) => {
  const [slide, setSlide] = useContext(ImageSlideContext);
  const changeSlide = (index: number) => {
    if (index >= (slide?.images?.length || 0)) {
      index = 0;
    }
    setSlide((prev) => ({
      ...prev,
      index,
    }));
  };

  let interval: ReturnType<typeof setInterval> | null = null;
  const autoSlide = useRef<() => void>();
  autoSlide.current = () => {
    if (auto > 0) {
      interval = setInterval(() => {
        setSlide((prev) => ({
          ...prev,
          index: prev.index + 1 >= (prev.images?.length || 0) ? 0 : prev.index + 1,
        }));
      }, auto);
    }
  };
  useEffect(() => {
    if (autoSlide.current) {
      autoSlide.current();
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [interval]);

  return (
    <HStack mt={4} w="full" justify="center" display={controls ? 'flex' : 'none'}>
      {slide?.images?.map((img, index) => (
        <Button
          onClick={() => changeSlide(index)}
          colorScheme={slide?.index === index ? 'blue' : 'gray'}
          borderRadius="full"
          size="sm"
          key={`button_${img}`}
        >
          {index + 1}
        </Button>
      ))}
    </HStack>
  );
};

const ImageDisplay: React.FC<{ minH: string, rounded: string }> = ({ minH, rounded = 'md' }) => {
  const [slide] = useContext(ImageSlideContext);

  return (
    slide?.images && (
      <Flex align="center" direction="column" minH={minH}>
        {slide?.images.map((img, index) => (
          <Collapse animateOpacity in={index === slide?.index} key={`image_${img}`}>
            <Image src={img} backgroundColor={'white'} rounded={rounded} p={6} />
          </Collapse>
        ))}
      </Flex>
    )
  );
};

const CaptionDisplay: React.FC = () => {
  const [slide] = useContext(ImageSlideContext);
  const caption = useMemo(() => slide?.captions?.[slide?.index], [slide]);

  return (
    <Flex w="full" p={4} justify="center">
      <Text>{caption}</Text>
    </Flex>
  );
};

interface ImageSlideProps {
  images: string[];
  captions: string[];
  auto?: number;
  minH?: string;
  controls?: boolean;
  showCaptions?: boolean;
  rounded?: string;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ images, captions, auto = 5000, minH = '500px' , showCaptions = true, controls= true, rounded = 'md' }) => {
  const [slide, setSlide] = useState<ImageSlideContextValue>({
    ...defaultValues,
    images,
    captions,
    showCaptions,
    controls,
    rounded
  });

  return (
    <ImageSlideContext.Provider value={[slide, setSlide]}>
      <Flex w="full" direction="column">
        <ImageDisplay minH={minH} rounded={rounded} />
        {showCaptions && <CaptionDisplay />}
        <ImageSlideController auto={auto} controls={controls}/>
      </Flex>
    </ImageSlideContext.Provider>
  );
};

export default ImageSlide;