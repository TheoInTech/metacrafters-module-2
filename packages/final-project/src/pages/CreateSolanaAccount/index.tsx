import { Button, Loader } from "components";
import { useDispatch, useSelector } from "redux/store";
import {
  getGlobalState,
  setCurrentStep,
  setIsLoading,
  setPayer,
  setPayerBalance,
  Steps,
} from "redux/slices/globalSlices";
import { useEffect, useState } from "react";
import useWallet from "utils/hooks/useWallet";
import establishConnection from "utils/helpers/establishConnection";
import { Connection, Keypair } from "@solana/web3.js";
import { isNotEmptyObject } from "utils/helpers/isNotEmptyObject";

const CreateSolanaAccount = () => {
  const dispatch = useDispatch();
  const { isLoading, payer } = useSelector(getGlobalState);
  const [ connection, setConnection ] = useState<Connection>()
  const { airdropSol, getWalletBalance } = useWallet();

  const handleCreateNewSolanaAccount = async () => {
    await dispatch(setIsLoading(true));
    setConnection(await establishConnection())
  };

  useEffect(() => {
    let mounted = true;

    const connectionEffect = async () => {
      mounted && (await dispatch(setPayer(Keypair.generate())));
    };

    const payerEffect = async () => {
      mounted && (await airdropSol(payer));
      mounted && (await dispatch(setPayerBalance(await getWalletBalance(payer))));
      mounted && (await dispatch(setIsLoading(false)));
      mounted && (await dispatch(setCurrentStep(Steps.ConnectToPhantomWallet)));
    };

    if (isNotEmptyObject(connection) && !isNotEmptyObject(payer)) {
      connectionEffect();
    }

    if (isNotEmptyObject(connection) && isNotEmptyObject(payer)) {
      payerEffect();
    }

    return () => {
      mounted = false;
    };
  }, [connection, payer]);

  return (
    <>
      <Button onClick={handleCreateNewSolanaAccount}>
        {isLoading && <Loader />} Create New Solana Account
      </Button>
    </>
  );
};

export default CreateSolanaAccount;
