<template>
    <div class="container-fluid"  style = "height: 100%">
        <div class="row">
            <div class="col-md-6 px-0">
            <img src="../components/images/landingPage/groceries.webp" alt="" style="object-fit: cover; height:100%;width:100%">
        </div>
            
            <!-- sign in -->
            <div class="col-md-6 px-5">
                <!-- filler -->
                <div class="container" style="padding-top:20%">
                    <h1 class = "m-4 ms-0">Log In</h1>

                    <form @submit.prevent="checkCredentials">
                        <div class="row">
                            <div class="col mb-3">
                                <span v-if="errors.logIn" class="error text-danger">{{ errors.logIn }}</span>
                                <label for="email" class="form-label">Email address</label>
                                <input type="email" class="form-control" v-model="formData.email" id="email" placeholder="Enter Email">
                            </div>
                        </div>
                        
  


                        <div class="row">
                            <!-- <div class="mb-3 pe-0"> -->
                                <div class="col mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" v-model="formData.password" id="password" placeholder="Enter Password">    
                                    <label class="mx-2"><input type="checkbox" id="toggle-password" v-bind="showPassword" @click="togglePassword()"/> 
                                <div id="pwStatus"> &nbsp{{ pwStatus }}</div></label>               
                                    <br>
                                   
                                </div>
                                
                            <!-- </div> -->
                        </div>
                            
                        <div class="row">
                            <!-- <div class="col-6">
                                not sure how to do this LOL
                                <input type="checkbox" id="remember" style="transform: scale(1.5);"> &nbsp Remember me                        
                            </div> -->
                            {{ errors.logIn }}

                            <div class="col-6 mb-3">
                                <a href="/resetPassword">Forgot Password?</a>
                            </div>
                        </div>
                    
                        <!-- can insert on key down enter to log in instead of pressing the create account button -->
                        <div class="row d-flex">
                            <div class="col">
                                <button style="width:100%" type="submit" class="btn btn-success p-2 base" @keyup.enter="checkCredentials">Log In</button>
                            </div>
                            
                        </div>

                        <hr class="bg-secondary border-2 border-top border-secondary mt-5" />

                        <!-- <div class="row"> -->
                        <p class="mt-2">
                            Don't have an account? <a href="/signUp" style="display:inline">Sign Up</a>
                            <!-- </div> -->
                        </p>
                    </form>
                </div>
            </div>    
            
        </div>
    </div>
    
</template>

<script>
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";    
import { auth } from '../firebase/index.js'
import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                showPassword: false, //to toggle password view
                pwStatus: 'Show Password',

                formData: {
                    email: '',
                    password: '',
                },
                errors: {
                    logIn: ''
                },

                // userLoggedIn: localStorage.getItem('userLoggedIn') === 'true',            
            };
        },
        computed: {
            ...mapState([
                'userLoggedIn',
                'user'
            ])
        },
        methods: {
            togglePassword(){
            this.showPassword = !this.showPassword
            if(this.showPassword){ //show password
                document.getElementById('password').type = "text"
                this.pwStatus = "Hide Password"
            }else{ //mask password
                document.getElementById('password').type = "password"
                this.pwStatus = "Show Password"
            }
        },
            checkCredentials() {
                // const auth = getAuth()

                signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)                
                .then((userCredential) => {
                    // Handle successful login (e.g., redirect to user profile)
                    console.log(userCredential)
                    var user = userCredential.user
                    console.log('login successful')                    

                    this.$store.commit('setUser', user) // update

                    this.$router.push('/')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;    
                    console.log(errorCode, errorMessage)
                    this.errors.logIn = 'Wrong email/password'            
                });
            },

            ...mapActions(["setUserLoggedIn"]), // Map the setUserLoggedIn action from the store
                login() {
                // Then set the userLoggedIn status to true
                this.setUserLoggedIn(true);
            },
        },
    };

</script>

<style>
#pwStatus{
    display: inline
}
</style>
