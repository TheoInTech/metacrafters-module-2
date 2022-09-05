import { Main, Container } from "components";
import CreateSolanaAccount from "pages/CreateSolanaAccount";
import ConnectToPhantomWallet from "pages/ConnectToPhantomWallet";
import { useSelector } from "redux/store";
import { getGlobalState, Steps } from "redux/slices/globalSlices";
import shortenAddress from "utils/helpers/shortenAddress";
import Badge from "components/Badge";

function App() {
  const { currentStep, payer, payerBalance } = useSelector(getGlobalState);

  // HTML code for the app
  return (
    <Main>
      <Container>
        <h1 className="mb-8 text-4xl font-bold uppercase text-[#EFEBC1]">
          Metacrafters Module 2
        </h1>

        <div className="flex items-center">
          <Badge
            title={"Payer"}
            description={
              payer?.publicKey
                ? shortenAddress(payer?.publicKey)
                : "No payer found"
            }
            color={"blue"}
          />
          <Badge
            title={"Payer SOL Balance"}
            description={`${payerBalance} SOL`}
            color={"purple"}
          />
        </div>
        {currentStep === Steps.CreateSolanaAccount && <CreateSolanaAccount />}
        {currentStep === Steps.ConnectToPhantomWallet && (
          <ConnectToPhantomWallet />
        )}
      </Container>
    </Main>
  );
}

export default App;
