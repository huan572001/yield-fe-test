import { Strategies } from "@/services/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IAuthState {
  isOpen: boolean;
  modal: {
    isOpen: boolean;
    component: React.ReactNode;
  };
  modalSupply: {
    isOpen: boolean;
    strategies: Strategies;
  };
  modalWithdraw: {
    isOpen: boolean;
    strategies: Strategies;
  };
  modalStake: {
    isOpen: boolean;
    strategies: Strategies;
  };
  modalSettings: {
    isOpen: boolean;
    strategies: Strategies;
  };
}

const initialState: IAuthState = {
  isOpen: false,
  modal: {
    isOpen: false,
    component: null,
  },
  modalSupply: {
    isOpen: false,
    strategies: {} as Strategies,
  },
  modalWithdraw: {
    isOpen: false,
    strategies: {} as Strategies,
  },
  modalStake: {
    isOpen: false,
    strategies: {} as Strategies,
  },
  modalSettings: {
    isOpen: false,
    strategies: {} as Strategies,
  },
};

export const modalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.isOpen = true;
    },
    setCloseModal: (state) => {
      state.isOpen = false;
    },
    setOpenModalDynamically: (
      state,
      action: PayloadAction<{ isOpen: boolean; component: React.ReactNode }>
    ) => {
      state.modal.isOpen = action.payload.isOpen;
      state.modal.component = action.payload.component;
    },
    setCloseModalDynamically: (state) => {
      state.modal.isOpen = false;
      state.modal.component = null;
    },
    setOpenModalSupply: (
      state,
      action: PayloadAction<{ isOpen: boolean; strategies: Strategies }>
    ) => {
      state.modalSupply.isOpen = action.payload.isOpen;
      state.modalSupply.strategies = action.payload.strategies;
    },
    setCloseModalSupply: (state) => {
      state.modalSupply.isOpen = false;
      state.modalSupply.strategies = {} as Strategies;
    },
    setOpenModalWithdraw: (
      state,
      action: PayloadAction<{ isOpen: boolean; strategies: Strategies }>
    ) => {
      state.modalWithdraw.isOpen = action.payload.isOpen;
      state.modalWithdraw.strategies = action.payload.strategies;
    },
    setCloseModalWithdraw: (state) => {
      state.modalWithdraw.isOpen = false;
      state.modalWithdraw.strategies = {} as Strategies;
    },
    setOpenModalStake: (
      state,
      action: PayloadAction<{ isOpen: boolean; strategies: Strategies }>
    ) => {
      state.modalStake.isOpen = action.payload.isOpen;
      state.modalStake.strategies = action.payload.strategies;
    },
    setCloseModalStake: (state) => {
      state.modalStake.isOpen = false;
      state.modalStake.strategies = {} as Strategies;
    },
    setOpenModalSettings: (
      state,
      action: PayloadAction<{ isOpen: boolean; strategies: Strategies }>
    ) => {
      state.modalSettings.isOpen = action.payload.isOpen;
      state.modalSettings.strategies = action.payload.strategies;
    },
    setCloseModalSettings: (state) => {
      state.modalSettings.isOpen = false;
      state.modalSettings.strategies = {} as Strategies;
    },
  },
});

export const {
  setOpenModal,
  setCloseModal,
  setCloseModalDynamically,
  setOpenModalDynamically,
  setOpenModalSupply,
  setCloseModalSupply,
  setOpenModalSettings,
  setCloseModalSettings,
  setCloseModalWithdraw,
  setOpenModalWithdraw,
  setCloseModalStake,
  setOpenModalStake,
} = modalSlice.actions;

export default modalSlice.reducer;
