const state = () => ({
  dialog: false,
});

const getters = {
  getDialogStatus: (state: any) => state.dialog,
};

const mutations = {
  setDialogStatus(state: any, value: boolean) {
    state.dialog = value;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};