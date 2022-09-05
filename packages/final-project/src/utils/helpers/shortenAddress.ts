import { PublicKey } from "@solana/web3.js";

const shortenAddress = (address: string | PublicKey = '') => {
  const newAddress = address?.toString()
  const length = newAddress?.length;

  if (length > 0)
    return (
      newAddress?.substring(0, 4)?.toLowerCase() +
      "..." +
      newAddress?.substring(length - 4, length)?.toLowerCase()
    );

  return "0000...0000";
};

export default shortenAddress;
