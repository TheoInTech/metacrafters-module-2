// Import Solana web3 functinalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
  sendAndConfirmRawTransaction,
  sendAndConfirmTransaction,
} = require("@solana/web3.js");

const DEMO_FROM_SECRET_KEY = new Uint8Array([
  160, 20, 189, 212, 129, 188, 171, 124, 20, 179, 80, 27, 166, 17, 179, 198,
  234, 36, 113, 87, 0, 46, 186, 250, 152, 137, 244, 15, 86, 127, 77, 97, 170,
  44, 57, 126, 115, 253, 11, 60, 90, 36, 135, 177, 185, 231, 46, 155, 62, 164,
  128, 225, 101, 79, 69, 101, 154, 24, 58, 214, 219, 238, 149, 86,
]);

// Airdrop SOL to a given private key
const airdropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

    console.log(`Airdropping 2 SOL to my wallet: ${myWallet.publicKey}`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(myWallet.publicKey),
      2 * LAMPORTS_PER_SOL
    );

    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

// Get the wallet balance from a given private key
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const myWallet = await Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(
      `Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`
    );

    return walletBalance;
  } catch (err) {
    console.log(err);

    return 0;
  }
};

// Transfer SOL from a given private key to a newly generated keypair
const transferSol = async () => {
  // Check balance first
  const walletBalance = await getWalletBalance();

  if (!walletBalance) {
    console.log("You have zero balance. Insufficient funds.");
    return;
  }

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  var from = Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);

  // Generate another Keypair (account we'll be sending to)
  const to = Keypair.generate();

  // Send money from "from" wallet and into "to" wallet
  var transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: walletBalance / 2, // Divide wallet balance to 2 to get 50%
    })
  );

  // Sign transaction
  var signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);

  console.log("Signature is ", signature);
};

const main = async () => {
  await airdropSol();
  await transferSol();
  //   Recheck wallet balance
  await getWalletBalance();
};

main();
