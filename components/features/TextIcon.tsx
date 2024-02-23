import { Text, Box, useColorMode, Center, Flex, Button, Collapse, Icon, useMediaQuery } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';

import { useState } from 'react';

interface Props {
  text: string;
  hoverText: string;
  icon: JSX.Element;
  i?: number;
}

const cardVariants = (i:number) => {
  const _var: Variants = {
    offscreen: {
      opacity: 0,
      y: 200,
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8
      },
    },
  };
  return _var;
};

export default function TextIcon({ text, icon, hoverText, i = 0 }: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery('(min-width: 980px)');
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
    >
    <motion.div variants={notMobile ? cardVariants(i) : undefined}>
      <Center
        key={`text-icon-${text}`}
        bg={
          colorMode === 'dark'
            ? hover
              ? 'blackAlpha.600'
              : 'blackAlpha.300'
            : hover
            ? 'white'
            : 'whiteAlpha.300'
        }
        flexDirection="column"
        transition={'all 1s ease'}
        borderRadius={16}
        borderWidth={1}
        cursor={'pointer'}
        borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'gray'}
        minWidth={'xs'}
        minH={250}
        onMouseEnter={() => setHover(true)}
        onMouseMove={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>
        <Center flexDirection="column" px={6} transition={'all 1s ease'}>
          {!hover && <Box my={4}>{icon}</Box>}
          <Text fontSize={['lg', 'lg', 'xl']} fontWeight="bold" my={1} align={'center'}>
            {text}
          </Text>
          <Collapse
            in={hover}
            animateOpacity
            transition={{ enter: { duration: 0.3 }, exit: { duration: 0.3 } }}>
            <Text fontSize={['lg', 'lg']} fontWeight="normal" my={1} align={'center'}>
              {hoverText}
            </Text>
          </Collapse>
          {/* <Text fontSize={'lg'} fontWeight='light'>
          {text}
        </Text> */}
        </Center>
      </Center>
    </motion.div>
    </motion.div>
  );
}
