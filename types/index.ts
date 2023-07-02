import { Address } from "next-seo/lib/types"

export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PrimaryName {
  nftAddress?: Address;
  name?: string;
}