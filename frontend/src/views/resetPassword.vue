<template>
    <div class="row">
        <div class="col-6">
            <img src="../components/images/sharing.jpg" alt="" style="width:100%;height:120%">
        </div>
        
        <!-- sign in -->
        <div class="col-6">
            <!-- filler -->
            <div class="container" style="padding-top:30%">
                <h1 class = "m-4 ms-0">Reset Password</h1>

                <form>
                    <div class="row">
                        <div class="mb-3 pe-0">
                            <label for="password" class="form-label">Old Password</label>
                            <input type="password" class="form-control" id="oldPassword">
                        </div>
                </div>


                    <div class="row">
                            <div class="mb-3 pe-0">
                                <label for="password" class="form-label">New Password</label>
                                <input type="password" class="form-control" id="newPassword">
                                <small id="emailHelp" class="form-text text-muted">Your password must contain at least 8 characters, including 1 symbol, and 1 uppercase letter</small>

                            </div>
                    </div>
                
                   
                    <!-- can insert on key down enter to log in instead of pressing the create account button -->
                    <div class="row d-flex">
                        <button type="submit" class="btn btn-success p-2 base">Log In</button>
                      </div>                   
                       
                </form>
            </div>
        </div>    
        
    </div>
</template>