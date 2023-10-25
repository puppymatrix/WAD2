import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {getCoordinates} from "../firebase/api.js"

export default createStore({
  state: {
    user: null,
    location: null
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    userLocation: (state) => state.location,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLocation(state, location) {
      state.location = location;
    },
  },
  actions: {
  },
  modules: {},
});