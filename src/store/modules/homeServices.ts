import {Server} from "@/models/server";

const state = () => ({
  servers: [] as Server[],
});

const getters = {
  getAllServers: (state: any) => state.servers,
  getServerById: (state: any) => (id: number) =>  state.servers.find((server: Server) => server.id == id),
};

const mutations = {
  setDialogStatus(state: any, value: boolean) {
    state.dialog = value;
  },
  setServers(state: any, servers: Server[]) {
    state.servers = servers;
  },
  addServer(state: any, server: Server) {
    state.servers.push(server);
  },
  removeServerById(state: any, id: number) {
    state.servers = state.servers.filter((server: Server) => server.id != id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};