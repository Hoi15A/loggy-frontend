import {Server} from "@/models/server";

const state = () => ({
  dialog: false,
  server: {} as Server,
});

const getters = {
  getDialogStatus: (state: any) => state.dialog,

  getServer: (state: any) => state.server,
};

const mutations = {
  setDialogStatus(state: any, value: boolean) {
    state.dialog = value;
  },

  setServer(state: any, server: Server) {
    state.server = server;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};