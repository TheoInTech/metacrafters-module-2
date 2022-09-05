import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { Keypair } from "@solana/web3.js";

export enum Steps {
  CreateSolanaAccount = "Create Solana Account",
  ConnectToPhantomWallet = "Connect To Phantom Wallet",
  TransferToNewWallet = "Transfer To New Wallet",
}

export interface GlobalState {
  isLoading: boolean;
  error: string;
  currentStep: Steps;
  payer: Keypair;
  payerBalance: number;
}

/* 
    Default state object with initial values
*/
const initialState: GlobalState = {
  isLoading: false,
  error: "",
  currentStep: Steps.CreateSolanaAccount,
  payer: {} as Keypair,
  payerBalance: 0,
} as const;

/* 
    Create a slice as a reducer containing actions
*/
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoading: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.isLoading>
    ) => {
      state.isLoading = action.payload;
    },
    setError: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.error>
    ) => {
      state.error = action.payload;
    },
    setCurrentStep: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.currentStep>
    ) => {
      state.currentStep = action.payload;
    },
    setPayer: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.payer>
    ) => {
      state.payer = action.payload;
    },
    setPayerBalance: (
      state: Draft<typeof initialState>,
      action: PayloadAction<typeof initialState.payerBalance>
    ) => {
      state.payerBalance = action.payload;
    },
  },
});

export const getGlobalState = (state: { global: GlobalState }) => state.global;

export const {
  setIsLoading,
  setError,
  setCurrentStep,
  setPayer,
  setPayerBalance,
} = globalSlice.actions;

export default globalSlice.reducer;
