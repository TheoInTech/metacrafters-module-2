import { useState } from "react";
import { useDispatch, useSelector } from "redux/store";
import { Keypair } from "@solana/web3.js";
import { Button, Loader } from "components";
import shortenAddress from "utils/helpers/shortenAddress";
import useProvider from "utils/hooks/useProvider";
import useWallet from "utils/hooks/useWallet";
import Badge from "components/Badge";
import { getGlobalState, setPayerBalance } from "redux/slices/globalSlices";
window.Buffer = window.Buffer || require("buffer").Buffer;

const ConnectToPhantomWallet = () => {
  const { provider } = useProvider();
    const dispatch = useDispatch();
    const { isLoading, payer, payerBalance } = useSelector(getGlobalState);

  const [wallet, setWallet] = useState<Keypair>();
  const { walletBalance, transferSol, getWalletBalance, airdropSol } =
    useWallet(wallet);

  const connectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log(
          "wallet account ",
          response.publicKey.toString(),
          solana.isConnected
        );
        setWallet(response);
      } catch (err) {}
    }
  };

  const disconnectWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    try {
      const response = await solana.disconnect();
      console.log(
        "wallet successfully disconnected ",
        response,
        solana.isConnected
      );
      setWallet(undefined);
    } catch (err) {}
  };

  const handleTransferSol = async () => {
    if (provider && wallet && payer) {
      await transferSol(payer, 2);
      await dispatch(setPayerBalance(await getWalletBalance(payer)))
    }
  };

  const handleAirdropToPayer = async () => {
    if (payer) {
      await airdropSol(payer);
      await dispatch(setPayerBalance(await getWalletBalance(payer)))
    }
  };

  const goToPhantomWebsite = () => {
    window.open("https://phantom.app/", "_blank");
  };

  return (
    <>
      <hr className="w-full border-gray-600 border-1" />
      {provider && !wallet && (
        <>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </>
      )}
      <div className="flex flex-col items-center gap-4">
        {provider && wallet && payer && (
          <>
            <div>
              <Badge
                title={"Wallet"}
                description={shortenAddress(wallet?.publicKey)}
                color={"gold"}
              />
              <Badge
                title={"Wallet SOL Balance"}
                description={`${walletBalance} SOL`}
                color={"purple"}
              />
            </div>
            <div className="flex gap-4">
              <Button onClick={handleAirdropToPayer}>Airdrop to Payer</Button>
              <Button disabled={payerBalance <= 2} onClick={handleTransferSol}>Transfer to Wallet</Button>
            </div>
            <Button variant="outline" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </>
        )}
        {!provider && (
          <>
            <span>Oops! No provider found.</span>
            <Button onClick={goToPhantomWebsite}>Install Phantom</Button>
          </>
        )}
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default ConnectToPhantomWallet;
