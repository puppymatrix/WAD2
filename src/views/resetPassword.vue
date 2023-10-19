<template>
    <div class="row">
        <div class="col-6">
            <img src="../components/icons/images/placeholder.png" alt="" style="width:100%;height:120%">
        </div>
        
        <!-- sign in -->
        <div class="col-6">
            <!-- filler -->
            <div class="container" style="padding-top:30%">
                <h1 class = "m-4 ms-0">Reset Password</h1>

                <form @submit.prevent="resetPassword">
                    <div class="row">
                        <div class="mb-3 pe-0">
                            <label for="password" class="form-label">Old Password</label>
                            <input type="password" class="form-control" id="oldPassword">
                        </div>
                </div>


                    <div class="row">
                            <div class="mb-3 pe-0">
                                <label for="password" class="form-label">New Password</label><br>
                                <small id="emailHelp" class="form-text text-muted">Your password must contain at least 8 characters, including 1 symbol, and 1 uppercase letter</small>
                                <input type="password" class="form-control" id="newPassword">
                                <div id="passwordErrors" >
                                    <text v-for="error in errors.newPassword" :key="error" class="d-block text-danger">{{ error }}</text>
                            </div> 
                            </div>
                    </div>
                
                   
                    <!-- can insert on key down enter to log in instead of pressing the create account button -->
                    <div class="row d-flex">
                        <button type="submit" class="btn btn-success p-2 base" @keyup.enter="resetPassword">Reset Password</button>
                      </div>                   
                       
                </form>
            </div>
        </div>    
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                oldPassword: '',
                newPassword: '', 
            },
            errors: {
                oldPassword: '',
                newPassword: []
            },
            
        }
    },
    methods: {
        resetPassword(){ //update password to backend here
            if (this.validateForm() && this.checkPassword){
                // reset password if successful update database 
                console.log('password reset successfully')
                //reroute to log in page 
                this.$router.push('/listing')
            } 
        },
        checkPassword(){ // connect to backend here
        // check database for correct password 
        if (true){ 
            return true
        } else {
            this.errors.oldPassword='Wrong password'
        } // for now 
        },

        validateForm(){

            var isValid = true

                // form validation 
            var msg = ''

            if (this.formData.newPassword.length < 8){
                msg = 'Password does not meet minimum length'

                if (!this.errors.newPassword.includes(msg)){
                    this.errors.newPassword.push(msg) 
                }
                isValid = false
            } 

            if (!this.hasSpecialCharacters(this.formData.newPassword)){

                msg = 'Password requires at least 1 special character'

                if (!this.errors.newPassword.includes(msg)){
                    this.errors.newPassword.push(msg) 
                }
                isValid = false
            } 

            if (!this.hasUppercaseLetters(this.formData.newPassword)){

                msg = 'Password requires at least 1 uppercase letter'

                if (!this.errors.newPassword.includes(msg)){
                    this.errors.newPassword.push(msg) 
                }
                isValid = false
                
            console.log(this.errors.newPassword)
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
    }
}
</script>