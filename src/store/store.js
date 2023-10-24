import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default createStore({
  state: {
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
  },
  modules: {},
});