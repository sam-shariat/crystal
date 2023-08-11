export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PrimaryName {
  nftAddress?: string;
  name?: string;
}