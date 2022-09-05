import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const convertFromLamports = (lamports: number) => {
    return lamports / LAMPORTS_PER_SOL
} 

const convertToLamports = (sol: number) => {
    return sol * LAMPORTS_PER_SOL
} 
  
export {
    convertFromLamports,
    convertToLamports
}