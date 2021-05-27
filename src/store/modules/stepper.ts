import {Server} from "@/models/server";

const state = () => ({
  dialog: false,
  stepIndex: 1,
  processingDialog: false,
  processingResponse: 0,
  failureMessage: "",
  configsByName: [],
  server: {} as Server,
});

const getters = {
  getDialogStatus: (state: any) => state.dialog,
  getStepIndex: (state: any) => state.stepIndex,
  getProcessingDialog: (state: any) => state.processingDialog,
  getProcessingResponse: (state: any) => state.processingResponse,
  getFailureMessage: (state: any) => state.failureMessage,
  getConfigsByName: (state: any) => state.configsByName,
  getServer: (state: any) => state.server,
};

const mutations = {

  setDialogStatus(state: any, value: boolean) {
    state.dialog = value;
  },

  setStepIndex(state: any, value: number) {
    state.stepIndex = value;
  },

  setProcessingDialog(state: any, value: boolean) {
    state.processingDialog = value;
  },

  setProcessingResponse(state: any, value: number) {
    state.processingResponse = value;
  },

  setServer(state: any, server: Server) {
    state.server = server;
  },

  setConfigsByName(state: any, value: string[]) {
    state.configsByName = value;
  },

  setFailureMessage(state: any, value: string) {
    state.failureMessage = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};