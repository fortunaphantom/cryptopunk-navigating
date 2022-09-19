import axios from "axios";

let cursor: string = "";
let totalSupply: number = 0
const punkContracAddress: string = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";

// Shorten a wallet address
export const shortenWalletAddress = (address: any) => {
  return `${address.slice(0, 5)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

// Load 50 crypto punks by order using Moralis API
export const getNFTs = () =>
  new Promise(async (resolve: (value: NFTItem[]) => void, reject) => {
    try {
      let headers: any = {}
      headers['accept'] = "application/json"
      headers["x-api-key"] = process.env.NEXT_PUBLIC_MORALIS_API_KEY
      let result = await axios.get(
        `https://deep-index.moralis.io/api/v2/nft/${punkContracAddress}`,
        {
          headers,
          params: {
            limit: 50,
            cursor
          }
        }
      );
      if(totalSupply === 0) {
        totalSupply = result.data.total
      }
      
      cursor = result.data.cursor

      let nftList: NFTItem[] = result.data.result?.map((item: any) => ({
        amount: parseInt(item.amount),
        block_number_minted: item.block_number_minted,
        metadata: JSON.parse(item.metadata),
        name: item.name,
        symbol: item.symbol,
        token_address: item.token_address,
        token_hash: item.token_hash,
        token_id: parseInt(item.token_id),
        token_uri: item.token_uri,
      }))
      resolve(nftList)
    } catch (error) {
      console.log("getNFTs: ", error);
      reject(error);
    }
  });
