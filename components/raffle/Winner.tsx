
import { Tag, Td, Tr, Text, Tooltip, useColorMode } from "@chakra-ui/react";
import { LinkIcon, Logo } from "components/logos";
import { connectedAccountAtom, venomProviderAtom } from "core/atoms";
import { truncAddress } from "core/utils";
import { lookupNames } from "core/utils/reverse";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

interface WinnerProps {
  owner: string;
  prize: string;
}

const Winner = ({ owner, prize }: WinnerProps) => {
    const lightMode = useColorMode().colorMode === 'light';
    const provider = useAtomValue(venomProviderAtom);
    const connectedAccount = useAtomValue(connectedAccountAtom);
    const [name,setName] = useState(owner);


    const getOwnerName = async () => {
        const _name = await lookupNames(provider, owner);
        console.log(_name)
        if(_name.length > 0) setName(_name[0]);
    };

    useEffect(()=> {

        if(connectedAccount.length > 60 && provider){
            getOwnerName();
        }

    },[provider, connectedAccount])

    return (
    <Tr>
    <Td isNumeric gap={2} display={'flex'} alignItems='center' >{prize.includes('VENOM') ? <LinkIcon type='venom' color='#2bb673'/> : <Logo w={'35px'} h={'26px'} />}{prize}</Td>
    <Td>
      <Tooltip hasArrow
          color="white"
          bgColor={'black'} p={4} rounded={'2xl'} label={owner} aria-label={`winner-${prize}-tooltip`}>
      <Tag
        px={3} py={1}
        rounded={'full'}
        textAlign={'center'}
        fontSize={'xl'}
        fontWeight={'bold'}>
        <Text
          bgGradient={
            lightMode
              ? 'linear(to-r, var(--venom2), var(--bluevenom2))'
              : 'linear(to-r, var(--venom0), var(--bluevenom0))'
          }
          bgClip="text">
          {name.includes('.venom') ? name : truncAddress(owner)}
        </Text>
      </Tag></Tooltip></Td>
  </Tr>
    )
};

export default Winner;