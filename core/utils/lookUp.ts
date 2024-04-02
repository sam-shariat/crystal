import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { ROOT_CONTRACT_ADDRESS } from "./constants";
import RootAbi from "abi/Root.abi.json";
import DomainAbi from "abi/Domain.abi.json";

export async function lookupAddress(
  provider: ProviderRpcClient,
  path: string
) {
  if (!provider) return;
  const rootContract = new provider.Contract(
    RootAbi,
    new Address(ROOT_CONTRACT_ADDRESS)
  );

  // @ts-ignore
  const certificateAddr: { certificate: Address } = await rootContract.methods.resolve({ path: path, answerId: 0 })
    .call({ responsible: true });

  const domainContract = new provider.Contract(
    DomainAbi,
    certificateAddr.certificate
  );
  console.log(certificateAddr);

  try {
    // @ts-ignore: Unreachable code error
    const { target } = await domainContract.methods.resolve({ answerId: 0 })
      .call({ responsible: true });
    console.log(target);
    if (target) {
      return String(target);
    } else {
      return "";
    }
  } catch (e) {
    return ""
  }
}