import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
interface Props {
  title?: string;
  value: string;
  setValue: Function;
  options: string[] | any[];
}
export default function SelectSizeButton({ title, value, setValue, options }: Props) {
  return (
    <Flex gap={2} width={'100%'} alignItems={'center'} justifyContent={'space-between'}>
      {title && <Text fontSize={'xl'} fontWeight={'bold'}>
        Select {title}
      </Text>}
      <ButtonGroup isAttached>
        {options.map((option) => (
          <Button
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
