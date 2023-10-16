<template>
    <div class="container-fluid"  style = "height: 100%">
        <div class="row">
        <div class="col-6">
            <img src="../components/images/sharing.jpg" alt="" style="width:100%;height:120%">
        </div>
        
        <!-- sign in -->
        
        <div class="col-6">
            <!-- filler -->
            <div class="container" style="padding-top:20%">
                <h1 class = "m-4 ms-0">Sign up</h1>

                <form>
                    <div class="row">
                        <div class="col col-lg-6 col-md-12 mb-3 pe-0">
                            <label for="firstName" class="form-label">First Name</label>
                            <input type="text" class="form-control" id="firstName" placeholder="Enter First Name">
                            <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
                        </div>

                        <div class="col col-lg-6 col-md-12 mb-3 pe-0">
                            <label for="lastName" class="form-label">Last Name</label>
                            <input type="text" class="form-control" id="lastName" placeholder="Enter Last Name">
                            <!-- <div id="emailHelp" class="form-text"></div> -->
                        </div>
                    </div>


                    <div class="row pb-2">
                        <label for="email">Email address</label>
                        <input type="email" class="form-control ms-3" id="email" placeholder="Enter Email">
                        <span v-if="errors.email" class="error text-danger">{{ errors.email }}</span>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>


                    <div class="row">
                        <div class="mb-3 pe-0">
                            <label for="password" class="form-label" >Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter Password">
                            <div id="passwordErrors" >
                                <!-- <ul> -->
                                    <text v-for="error in errors.password" :key="error" class="d-block text-danger">{{ error }}</text>
                                <!-- </ul> -->
                            </div>   
                        </div>
                    </div>
                        
                    <div class="row mb-3">
                            <p>I am a:</p>
                            <div class="col-1"></div>
                            <div class="form-check col-4">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">Individual</label>
                            </div>
                            <div class="form-check col-4" >
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                <label class="form-check-label" for="flexRadioDefault2">Business</label>
                            </div>
                    </div>
                   
                    <div class="row d-flex">
                        <button type="submit" class="btn btn-success p-2 base">Create Account</button>
                      </div>

                    <hr class="bg-secondary border-2 border-top border-secondary mt-5" />

                    <!-- <div class="row"> -->
                    <p class="mt-2">
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

export default {
  data() {
    return {
    };
  },
  methods: {

    createAccount(){
        // i think this is where it connects to the database 
        if (this.validateForm()){
            //submit
            console.log('login successful')
        } else{
            //display errors
        }
   }, 

    validateForm(){

        var isValid = true

            // form validation 
            if (!this.formData.email.includes("@")){
                this.errors.email = "Wrong email format"
                isValid = false
            }

            if (this.formData.password.length < 8){
                this.errors.password.push('Password does not meet minimum length') 
                isValid = false
            } 

            if (!this.hasSpecialCharacters(this.formData.password)){
                this.errors.password.push('Password requires at least 1 special character') 
                isValid = false
            } 

            if (!this.hasUppercaseLetters(this.formData.password)){
                this.errors.password.push('Password requires at least 1 uppercase letter') 
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