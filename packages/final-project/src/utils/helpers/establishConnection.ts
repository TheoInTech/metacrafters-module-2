import { Connection, clusterApiUrl, Cluster } from "@solana/web3.js";

let connection: Connection;

const establishConnection = async (connectTo: Cluster = "devnet") => {
  connection = new Connection(clusterApiUrl(connectTo), "confirmed");
  console.info(`Establishing connection: ${connection}`)

  return connection;
};

export default establishConnection;
