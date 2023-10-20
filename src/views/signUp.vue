<!-- <script setup type="module'">
import { validateForm} from "../components/functions/functions.js";
</script> -->

<template>
    <div class="container-fluid"  style = "height: 100%">
        <div class="row">
        <div class="col-sm-6 px-0">
            <img src="../components/images/landingPage/groceries.webp" alt="" style="object-fit: cover; height:100%;width:100%">
        </div>
        
        <!-- sign in -->
        
        <div class="col-sm-6 px-5">
            <!-- filler -->
            <div class="container" style="padding-top:15%">
                <h1 class = "m-4 ms-0">Sign up</h1>

                <form @submit.prevent="createAccount">
                    <div class="row">
                        <div class="col-12 col-lg-6 mb-3">
                            <label for="firstName" class="form-label">First Name</label>
                            <span v-if="errors.lastName" class="error text-danger ps-2">{{ errors.firstName }}</span>
                            <input type="text" class="form-control" v-model="formData.firstName" id="firstName" placeholder="Enter First Name">
                        </div>

                        <div class="col-12 col-lg-6 mb-3">
                            <label for="lastName" class="form-label">Last Name</label>
                            <span v-if="errors.lastName" class="error text-danger  ps-2">{{ errors.lastName }}</span>
                            <input type="text" class="form-control" v-model="formData.lastName" id="lastName" placeholder="Enter Last Name">
                        </div>
                    </div>

                    <div class="row pb-2">
                        <div class="col">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" v-model="formData.username" id="text" placeholder="Enter username">
                            <span v-if="errors.username" class="error text-danger">{{ username.email }}</span>
                        </div>
                    </div>

                    <div class="row pb-2">
                        <div class="col">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" v-model="formData.email" id="email" placeholder="Enter Email">
                            <span v-if="errors.email" class="error text-danger">{{ errors.email }}</span>
                            <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div class="mb-3">
                            <label for="password" class="form-label" >Password</label>
                            <input type="password" class="form-control" v-model="formData.password" id="password" placeholder="Enter Password">
                            <div id="passwordErrors" >
                                    <text v-for="error in errors.password" :key="error" class="d-block text-danger">{{ error }}</text>
                            </div>   
                        </div>
                        </div>
                    </div>
                        
                    <div class="row mb-3">
                            <p>I am a:</p>
                            <div class="col-1"></div>
                            <div class="form-check col-4">
                                <input class="form-check-input" type="radio" v-model="formData.accountType" value="Individual" checked>
                                <label class="form-check-label" for="flexRadioDefault1">Individual</label>
                            </div>
                            <div class="form-check col-4" >
                                <input class="form-check-input" type="radio" v-model="formData.accountType" value="Business">
                                <label class="form-check-label" for="flexRadioDefault2">Business</label>
                            </div>
                    </div>
                   
                    <div class="row d-flex">
                        <div class="col">
                            <button style="width: 100%" type="submit" class="btn btn-large btn-success p-2 base" @keyup.enter="createAccount">Create Account</button>
                        </div>
                        
                      </div>

                    <hr class="bg-secondary border-2 border-top border-secondary mt-5" />

                    <!-- <div class="row"> -->
                    <p class="mt-1">
                        Already have an account? Log in <a href="/logIn" style="display:inline">here</a>
                        <!-- </div> -->
                    </p>
                       
                </form>
            </div>
        </div>    
        
    </div>
    </div>
    
</template>

<script>
import { db } from "../firebase/index.js";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

export default {

  data() {
    return {
        formData: {
        email: '',
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        accountType: 'Individual'
        // Add more form fields here
      },
      errors: {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: []
        // Initialize errors for other form fields
      },
    };
  },
  methods: {

    createAccount(){ //INCOMPLETE
        // i think this is where it connects to the database 

        if (this.validateForm()){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password)

            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                const uid = user.uid
                console.log('account creation successful: user.uid')
                alert('account creation successful')

                //insert into firestore
                const userData = {
                    firstName: this.formData.firstName,
                    lastName: this.formData.lastName,
                    username: this.formData.username,
                    email: this.formData.email,
                    password: this.formData.password, 
                    accountType: this.formData.accountType,
                    choped: [],
                };

                console.log(this.formData.accountType)

                const docRef = addDoc(collection(db, "userInformation"), userData);
                this.$router.push('/logIn')
                if (docRef){
                    console.log("Document inserted successfully");
                }
                // return setDoc(userDocRef, userData);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log('Firebase Authentication Error:', errorCode, errorMessage)
            });
        } else{
            //display errors
        }
   }, 

    usernameExists(){ //INCOMPLETE
        
    },

    validateForm(){

        var isValid = true

            // form validation 
            console.log(this.formData.email[0].split('@').length)

            var msg = ''
            console.log(this.formData.email.split())

            if (this.formData.firstName == ""){
                this.errors.firstName = "Required"
                isValid = false
            }

            if (this.formData.lastName == ""){
                this.errors.lastName = "Required"
                isValid = false
            }

            if (!this.formData.email.split('@').length == 2){
                this.errors.email = "Wrong email format"
                isValid = false
            }

            if (this.formData.password.length < 8){
                msg = 'Password does not meet minimum length'

                if (!this.errors.password.includes(msg)){
                    this.errors.password.push(msg) 
                }
                isValid = false
            } 

            if (!this.hasSpecialCharacters(this.formData.password)){

                msg = 'Password requires at least 1 special character'

                if (!this.errors.password.includes(msg)){
                    this.errors.password.push(msg) 
                }
                isValid = false
            } 

            if (!this.hasUppercaseLetters(this.formData.password)){

                msg = 'Password requires at least 1 uppercase letter'

                if (!this.errors.password.includes(msg)){
                    this.errors.password.push(msg) 
                }
                isValid = false
                
            console.log(this.errors.password)
            } 

        return isValid
    },

    hasSpecialCharacters(inputString) {
        // Define a regular expression pattern to match special characters.
        // The pattern \W matches any non-word character (special character or symbol).
        const regex = /[\W_]/;

        // Use the test method to check if the string contains any special characters.
        return regex.test(inputString);
    }, 

    hasUppercaseLetters(inputString) {
        // Define a regular expression pattern to match uppercase letters (A-Z).
        const regex = /[A-Z]/;

        // Use the test method to check if the string contains any uppercase letters.
        return regex.test(inputString);
    }

        
    },
};

</script>