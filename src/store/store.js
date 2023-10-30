import { createStore } from "vuex";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import createPersistedState from "vuex-persistedstate";
// import { getUserLocation } from "../firebase/api.js"

// var userLocation = getUserLocation()

export default createStore({
    plugins: [createPersistedState()],
    state: {
        user: null,
        location: null,
        visible: false,
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        currentUser: (state) => state.user,
        currentUserLocation: (state) => state.location,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLocation(state, location) {
            state.location = location;
        },
        setVisible(state, value) {
            state.visible = value;
        },
    },
    actions: {},
    modules: {},
});
