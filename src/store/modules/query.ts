const state = () => ({
  queries: {},
});

const getters = {
  getAllQueries: (state: any) => state.servers,
  getQuery: (state: any) => (label: string) => state.queries[label],
};

const mutations = {
  addQuery(state: any, values: [string, string]) {
    state.queries[values[0]] = values[1];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
