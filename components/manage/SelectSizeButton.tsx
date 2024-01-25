import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { buttonBgColorAtom, roundAtom, variantAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';
interface Props {
  title?: string;
  value: string;
  setValue: Function;
  options: string[] | any[];
}
export default function SelectSizeButton({ title, value, setValue, options }: Props) {
  // const bgColor = useAtomValue(buttonBgColorAtom);
  // const variant = useAtomValue(variantAtom);
  // const round = useAtomValue(roundAtom);
  return (
    <Flex gap={2} width={'100%'} alignItems={'center'} justifyContent={title ? 'space-between' : 'center'}>
      {title && <Text fontSize={'xl'} fontWeight={'bold'}>
        Select {title}
      </Text>}
      <ButtonGroup isAttached justifyContent={'center'} display={'flex'} alignItems={'center'}>
        {options.map((option,i) => (
          <Button
            px={[3.5,4,3.5,3.5,3.5,5]}
            // colorScheme={bgColor}
            // rounded={round}
            variant={'outline'}
            zIndex={100+i}
            key={`button-select-${title}-${option}`}
            isActive={String(value) === String(option)}
            onClick={()=> setValue(option)}>
            {String(option)}
          </Button>
        ))}
      </ButtonGroup>
    </Flex>
  );
}
