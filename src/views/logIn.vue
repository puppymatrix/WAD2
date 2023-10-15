<template>
    <div class="container-fluid"  style = "height: 100%">
        <div class="row">
            <div class="col-6 pe-0">
                <img src="../components/images/sharing.jpg" alt="" style="width:100%;height:120%">
            </div>
            
            <!-- sign in -->
            <div class="col-6 pe-0">
                <!-- filler -->
                <div class="container" style="padding-top:20%">
                    <h1 class = "m-4 ms-0">Log In</h1>

                    <form @submit.prevent="beforeRouteEnter">
                        <span v-if="errors.logIn" class="error text-danger">{{ errors.logIn }}</span>
                        <div class="row pb-2 ">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control ms-2" v-model="formData.email" id="email" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>


                        <div class="row">
                                <div class="mb-3 pe-0">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" v-model="formData.password" id="password">                                                    
                                    <br>
                                    <small id="emailHelp" class="form-text text-muted">Your password must contain at least 8 characters, including 1 special character, and 1 uppercase letter</small>

                                </div>
                        </div>
                            
                        <div class="row mb-3">
                            <div class="col-6">
                                <!-- not sure how to do this LOL -->
                                <input type="checkbox" id="remember" style="transform: scale(1.5);"> &nbsp Remember me                        
                            </div>

                            <div class="col-6" style="text-align: right;">
                                <a href="/resetPassword">Forgot Password?</a>
                            </div>
                        </div>
                    
                        <!-- can insert on key down enter to log in instead of pressing the create account button -->
                        <div class="row d-flex">
                            <button type="submit" class="btn btn-success p-2 base" @keyup.enter="beforeRouteEnter">Log In</button>
                        </div>

                        <hr class="bg-secondary border-2 border-top border-secondary mt-5" />

                        <!-- <div class="row"> -->
                        <p class="mt-2">
                            No account yet? <a href="/signUp" style="display:inline">Sign Up</a>
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
      formData: {
        email: '',
        password: '',
        // Add more form fields here
      },
      errors: {
        logIn: ''
        // Initialize errors for other form fields
      },
    };
  },
  methods: {
    beforeRouteEnter(to, from, next) {
        if (this.checkCredentials(this.email, this.password)) {
            console.log('login successful')
            // next({ path: '/listing' }) // Redirect to the login page
            this.$router.push('/listing')
        } else {
            this.errors.logIn = 'Wrong email/password'
        }
    },

   checkCredentials(inputEmail, inputPassword){
        // access database to check account details 

        return false 
   }
   



  },
};

</script>