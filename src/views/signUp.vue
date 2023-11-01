<script setup>
  import { Icon } from '@iconify/vue';

  import { db } from "../firebase/index.js";
    import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
    import { setDoc, doc } from 'firebase/firestore'
    import { checkUniqueUsername } from "../firebase/api";
</script>

<template>
    <div class="container-fluid"  style = "height: 100%">
        <div class="row">
        <div class="col-sm-6 px-0">
            <img src="../components/images/landingPage/groceries.webp" alt="" style="object-fit: cover; height:100%;width:100%">
        </div>
        
        <!-- sign in -->
        
        <div class="col-md-6 px-5">
            <!-- filler -->
            <div class="container" style="padding-top:15%">
                <h1>Sign up</h1>

                <form @submit.prevent="createAccount">
                    <div class="row ">
                        <div class=" col-lg-6 mb-3 px-2">
                            <label for="firstName" class="form-label">First Name    </label>
                            <span v-if="errors.lastName" class="error text-danger ps-2">{{ errors.firstName }}</span>
                            <input type="text" class="form-control" v-model="formData.firstName" id="firstName" placeholder="Enter First Name">
                        </div>

                        <div class="col-lg-6 mb-3">
                            <label for="lastName" class="form-label">Last Name</label>
                            <span v-if="errors.lastName" class="error text-danger  ps-2">{{ errors.lastName }}</span>
                            <input type="text" class="form-control" v-model="formData.lastName" id="lastName" placeholder="Enter Last Name">
                        </div>
                    </div>

                    <div class="row ">
                        <div class="col mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" v-model="formData.username" id="text" placeholder="Enter Username">
                            <span v-if="errors.username" class="error text-danger">{{ errors.username }}</span>
                        </div>
                    </div>

                    <div class="row mb-3">
                        <div class="col ">
                            <label for="email" class="form-label">Email address</label>
                            <input type="text" class="form-control" v-model="formData.email" id="email" placeholder="Enter Email">
                            <span v-if="errors.email" class="error text-danger">{{ errors.email }}</span>
                            <!-- <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> -->
                        </div>
                    </div>

                    <div class="row">
                        <div class="col mb-3">
                            
                            <label for="password" class="form-label" >
                                Password <Icon icon="mdi:information-slab-circle-outline" class="infoIcon mb-1"/>: 
                                <p id="moreInfo">{{pwReq}}</p>
                            </label>
                            <input type="password" class="form-control" v-model="formData.password" id="password" placeholder="Enter Password">
                            <div id="passwordErrors" >
                                    <text v-for="error in errors.password" :key="error" class="d-block text-danger">{{ error }}</text>
                            </div>   
                            <label class="mx-2"><input type="checkbox" id="toggle-password" v-bind="showPassword" @click="togglePassword()"/> 
                                <div id="pwStatus"> &nbsp{{ pwStatus }}</div></label>
                        
                        </div>
                    </div>
                        
                    <div class="row pb-3">
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
                            <button style="width: 100%" type="submit" class="btn btn-success p-2 base" @keyup.enter="createAccount">Create Account</button>
                        </div>
                        
                      </div>

                    <hr class="bg-secondary border-2 border-top border-secondary mt-5" />

                    <p class="mt-1">
                        Already have an account? Log in <a href="/logIn" style="display:inline">here</a>
                    </p>
                       
                </form>
            </div>
        </div>    
        
    </div>
    </div>
    
</template>

<script>


export default {

  data() {
    return {
        showPassword: false, //to toggle password view
        pwStatus: 'Show Password',
        pwReq: 'Password should at least 8 characters, 1 special character, and 1 uppercase letter',

        formData: {
            email: '',
            password: '',
            username: '',
            firstName: '',
            lastName: '',
            accountType: 'Individual'
        },
      errors: {
        email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: []
      },
    };
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

    async createAccount(){ 
        var isValid = true
        this.errors.firstName = ''
        this.errors.lastName = ''
        this.errors.email = ''  
        this.errors.username = ''
        this.errors.password = []
        
        if (this.validateForm()){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password)

            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                const uid = user.uid
                alert('account creation successful')

                //insert into firestore
                const userData = {
                    firstName: this.formData.firstName,
                    lastName: this.formData.lastName,
                    username: this.formData.username,
                    accountType: this.formData.accountType,
                    email: this.formData.email,
                };


                setDoc(doc(db, "userInformation", user.uid), userData);
                try {
                    this.$router.push('/logIn')
                    console.log("Document inserted successfully")
                
                }

                catch (error){
                    console.log(error)
                }
                // .then(
                   
                // .catch((error) => {
                //     console.log(error.message)
                // });
            // })
            // .catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     console.log('Firebase Authentication Error:', errorCode, errorMessage)
            });
        } else{
            //display errors
            
        }
   }, 

    validateForm(){

        var isValid = true

            // form validation 

            var msg = ''

            if (this.formData.firstName == ""){
                this.errors.firstName = "Required"
                isValid = false
            }

            if (this.formData.lastName == ""){
                this.errors.lastName = "Required"
                isValid = false
            }

            if (this.formData.email == ""){
                this.errors.email = "Required"
                isValid = false
            } else if (this.formData.email.split('@').length != 2){
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

            if (this.formData.username == ""){
                this.errors.username = "Required"
                isValid = false
            }
            checkUniqueUsername(this.formData.username).then(isUnique => {
                if(!isUnique){
                    this.errors.username = "Username is taken";
                    isValid = false;
                    
                } else {
                    // Handle the case where the username is unique
                    // For example, clear the username error
                    
                }
            });
            
            // {
            //     console.log('checkusername')
            //     this.errors.username = "Username is taken"
            //     isValid = false
            // }

            console.log(this.errors.username)

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
<style>
#pwStatus{
    display: inline
}
#moreInfo{
    font-size: 12px;
    display: none;
  }

  .infoIcon:hover + #moreInfo{
    display: inline;
    color: green;
  }
</style>
