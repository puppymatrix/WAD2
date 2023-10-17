<script setup></script>

<template>
  <main>

    <!--search bar-->
    <form class="d-flex m-5" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Find the food you want!"
        aria-label="Search"
      />
      <button class="btn btn-success" type="submit">
          Search
      </button>
    </form>

    <!--buttons-->
    <div class="container-fluid my-1 mx-3">
      <div class="row">
        <div class="col-2">
          <form class="d-inline m-2" role="search">
            <button id="upload" class="btn btn-outline-success" type="submit">
            Upload images
            </button>
          </form>
        </div>
        <div class="col-8"></div>
        <div class="col-2 d-flex justify-content-center">
          <button type="button" class="btn btn-outline-success">
            <img
              src="../components/icons/googleMaps.png"
              alt=""
              class="img-fluid me-1"
              style="width: 20px"
            />
            Map View
          </button>
        </div>
      </div>
    </div>
  
    <!--form-->
    <form class="m-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <p class="mb-1">Name of Listing: </p>
            <input
              class="form-control me-2 mb-3"
              type="search"
              placeholder="Input Name of Listing"
              aria-label="Search"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <p class="mb-1">Description of Listing: </p>
            <input
              class="form-control me-2 mb-3"
              type="search"
              placeholder="Input Description of Listing"
              aria-label="Search"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-1">Location: </p>
            <input
              class="d-inline form-control me-2 mb-3"
              type="search"
              placeholder="Input Location"
              aria-label="Search"
              style="width: 100%;"
            />
          </div>

          <div class="col-md-6">
            <p class="mb-1">Category: </p>
            <b-form-select v-model="selected" class="mb-3" style="width: 100%">
              <!-- <b-form-select-option :value="null">Categories Available</b-form-select-option> -->
              <b-form-select-option value="a">Fresh fruits</b-form-select-option>
              <b-form-select-option value="b">Fresh vegetables</b-form-select-option>
              <b-form-select-option value="c">Leftover cooked food</b-form-select-option>
            </b-form-select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="mb-1">Price: </p>
            <input
              class="d-inline form-control me-2 mb-3"
              type="search"
              placeholder="Input Price"
              aria-label="Search"
              style="width: 100%;"
            />
          </div>

          <div class="col-md-6">
            <p class="mb-1">Quantity: </p>
            <input
              class="d-inline form-control me-2 mb-3"
              type="search"
              placeholder="Input Quantity"
              aria-label="Search"
              style="width: 100%;"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <button class="btn btn-success d-block" type="submit">
              Post Listing
            </button>
          </div>
        </div>
      </div>
    </form>
   
  </main>
</template>


<style>

  #upload{
    margin-left: 10px;
  }

</style>