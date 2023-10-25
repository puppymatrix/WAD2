import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getUserLocation } from "../firebase/api.js"

// var userLocation = getUserLocation()

export default createStore({
  state: {
    user: null,
    location: { lat:	1.337953, lng: 103.801784}
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    currentUserLocation: (state) => state.location
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLocation(state, location) {
      state.location = location;
    }
  },
  actions: {},
  modules: {},
});