<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <!-- BS navbar: start -->
    <!-- <nav class="navbar navbar-expand-lg bg-light" data-bs-theme="light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"
                            ><RouterLink to="/">Home</RouterLink></a
                        >
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"
                            ><RouterLink to="/listing"
                                >Individual listing</RouterLink
                            ></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"
                            ><RouterLink to="/addListing"
                                >Add listing</RouterLink
                            ></a
                        >
                    </li>
                    <li class="nav-item dropdown">
                        <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Dropdown
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#">Action</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#"
                                    >Another action</a
                                >
                            </li>
                            <li><hr class="dropdown-divider" /></li>
                            <li>
                                <a class="dropdown-item" href="#"
                                    >Something else here</a
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button class="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>
            </div>
        </div>
    </nav> -->
    <!-- BS navbar: start -->

    <!-- navigation bar for user signed in -->
    <div class="row d-none align-items-center" id="nav">
        <div class="col-1"></div>
        <div class="col-2 p-3 justify-content-center">
            <img src="../components/images/logo.png" alt="" class="img-fluid" id="logo">
        </div>
        <div class="col-6">
            <ul class="nav justify-content-center fs-4 p-4">

                <li class="nav-item">
                  <a class="nav-link text-dark" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-dark" href="#" >Listings</a>
                </li>
            </ul>
        </div>
        <div class="col-1"></div>

        <div class="col-1 p-3 justify-content-center">
            <img src="../components/images/user.png" alt="" class="img-fluid">
        </div>
        <div class="col-1"></div>

    </div>

    <div class="row" style="height: 300px;"></div>


    <!-- navigation bar for user NOT signed in -->

    <!-- <div class="row d-flex align-items-center" id="nav">
        <div class="col-1"></div>
        <div class="col-2 p-4 justify-content-center">
          <img src="../icons/images/logo.png" alt="" class="img-fluid" id="logo">
        </div>
        <div class="col-6">
          <ul class="nav justify-content-center fs-4 p-4">
            <li class="nav-item text-dark">
              <a class="nav-link text-dark" href="#">Home</a>
            </li>
            <li class="nav-item ">
              <a class="nav-link text-dark" href="#" >Listings</a>
            </li>
          </ul>
        </div>
      
      
        <div class="col-3 fs-4 p-3">
          <button type="button" class="btn btn-link" style="text-decoration: none; color: #43A046">Log In</button>
          <button type="button" class="btn btn-success base">Sign Up</button>
        </div>
      
        <div class="col-1"></div>
      </div>


    <div class="row" style="height: 300px;"></div> -->
</template>

<style scoped>
#logo {
    height: 40px;
}

#nav{
    background-color: #ebeff3;
}

.base{
    color: white;
    background-color:#43A046
}

.footer {
    background-color: #263238;
    padding-top: 80px;
    padding-bottom: 100px;
}

.img_small {
    height: 50%;
}

a>li{
    color: white
}


div img {
    margin: 5px;
}


</style>
