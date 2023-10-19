import { createStore } from "vuex";

const store = createStore({
    state: {
        userLoggedIn: false,
        user: '' // Initially, the user is not logged in
    },
    getters:{

    },
    mutations: {
        setUserLoggedIn(state, value) {
            state.userLoggedIn = value
        },

        setUser(state, user){
            state.userLoggedIn = user
        }
    },
    actions: {
        
    },
    modules: {},
});

export default store