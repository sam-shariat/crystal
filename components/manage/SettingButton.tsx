import { Box, Button, Switch, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  value: boolean;
  setValue: Function;
  top?: boolean;
  bottom?: boolean;
}

export default function SettingsButton({ title, value, setValue, top, bottom}: Props) {
  return (
    <Button
      px={4}
      variant="solid"
      size="lg"
      borderRadius={0}
      borderTopRadius={top ? 12 : 0}
      borderBottomRadius={bottom ? 12 : 0}
      width={'100%'}
      justifyContent="space-between"
      onClick={() => setValue(!value)}>
      <Text>{title}</Text>
      <Switch
        colorScheme="green"
        as={Box}
        bg={'none'}
        size="lg"
        isChecked={value}
        onClick={() => setValue(!value)}
      />
    </Button>
  );
}
