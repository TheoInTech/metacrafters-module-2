import {
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import establishConnection from "utils/helpers/establishConnection";
import {
  convertFromLamports,
  convertToLamports,
} from "utils/helpers/convertLamports";
import { useEffect, useState } from "react";
import { useDispatch } from "redux/store";
import { setIsLoading } from "redux/slices/globalSlices";
import { isNotEmptyObject } from "utils/helpers/isNotEmptyObject";

const useWallet = (wallet?: Keypair | undefined) => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const dispatch = useDispatch();

  /**
   * @description get wallet balance of a wallet keypair parameter or our own wallet as a default
   */
  const getWalletBalance = async (walletArg?: Keypair) => {
    const walletToCheck = walletArg ?? wallet;

    if (isNotEmptyObject(walletToCheck) && walletToCheck) {
      await dispatch(setIsLoading(true));
      try {
        const connection = await establishConnection();

        const walletBalance = convertFromLamports(
          await connection.getBalance(walletToCheck.publicKey)
        );
        console.log(`Wallet balance: ${walletBalance} SOL`);
        return walletBalance;
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch(setIsLoading(false));
      }
    }
    return 0;
  };

  /**
   * @description transfer SOL from a wallet to our wallet keypair
   */
  const transferSol = async (
    fromWallet: Keypair,
    amount: number
  ) => {
    if (isNotEmptyObject(fromWallet) && isNotEmptyObject(wallet) && wallet) {
      await dispatch(setIsLoading(true));

      try {
        const walletBalance = await getWalletBalance(fromWallet);

        if (!walletBalance) {
          console.log("You have zero balance. Insufficient funds.");
          return;
        }

        const fromPubkey = fromWallet.publicKey;
        const toPubkey = wallet.publicKey;
        const connection = await establishConnection();

        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: convertToLamports(amount),
          })
        );

        const signature = await sendAndConfirmTransaction(
          connection,
          transaction,
          [fromWallet]
        );
        console.log("Signature is ", signature);

        setWalletBalance(await getWalletBalance(wallet))
        console.log("Getting new balance of: ", toPubkey);
        
      } catch (err) {
        console.log(err);
      } finally {
        await dispatch(setIsLoading(false));
      }
    } else {
      console.log("Please provide sender and receiver wallets.");
    }
  };

  /**
   * @description airdrop SOL to a specific wallet keypair
   */
  const airdropSol = async (
    wallet: Keypair | undefined,
    amount: number = 2
  ) => {
    await dispatch(setIsLoading(true));

    try {
      const connection = await establishConnection();

      if (connection && wallet) {
        const sig = await connection.requestAirdrop(
          wallet.publicKey,
          convertToLamports(amount)
        );
        console.info(`Airdropping ${convertToLamports(amount)} SOL to: ${wallet?.publicKey.toString()}`);

        await connection.confirmTransaction(sig);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await dispatch(setIsLoading(false));
    }
  };

  useEffect(() => {
    let mounted = true;
    const effect = async () => {
      if (mounted && wallet) {
        setWalletBalance(await getWalletBalance());
      }
    };

    effect();
    return () => {
      mounted = false;
    };
  }, [wallet]);

  return {
    // variables
    walletBalance,

    // functions
    transferSol,
    getWalletBalance,
    airdropSol,
  };
};

export default useWallet;
