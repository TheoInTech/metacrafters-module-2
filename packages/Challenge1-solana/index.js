// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");

const airDropSol = async () => {
  // Use index 2 to get user wallet from CLI parameter
  const userWallet = process.argv[2];

  if (!userWallet) {
    console.log("Please input a wallet address");
    return;
  }

  try {
    // Connect to the Devnet and make a wallet from privateKey
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const solToAirdrop = 2;

    // Request airdrop of 2 SOL to the wallet
    console.log(`Airdropping 2 SOL to user's wallet: ${userWallet}!`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(userWallet),
      solToAirdrop * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);

    console.log("Airdrop Successful!");
  } catch (err) {
    console.log(err);
  }
};

// Airdrop SOL
const mainFunction = async () => {
  await airDropSol();
};

mainFunction();
