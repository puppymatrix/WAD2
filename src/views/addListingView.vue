<script setup>
  import { Icon } from '@iconify/vue';
</script>

<template>
  <main>

    <!--search bar-->
    <!-- <form class="d-flex m-5" role="search">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Find the food you want!"
        aria-label="Search"
      />
      <button class="btn btn-success" type="submit">
          Search
      </button>
    </form> -->
  
    <!--form-->
    <form class="m-5">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2 p-0">
            <form class="form-group" role="search">
              <button id="upload" class="btn btn-outline-success" type="submit">
              Upload images
              </button>
            </form>
          </div>
          <div class="col-10"></div>
        </div>
        <div class="row mt-4">
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
            <textarea
              class="form-control me-2 mb-3"
              type="search"
              placeholder="Input Description of Listing"
              aria-label="Search"
            ></textarea>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <p class="mb-1">Location: </p>
            <input
              class="d-inline form-control me-2 mb-3"
              type="search"
              placeholder="Input Location"
              aria-label="Search"
              style="width: 100%;"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <p class="mb-1">Type of Listing 
              <Icon icon="mdi:information-slab-circle-outline" class="infoIcon mb-1"/>
               : <p id="moreInfo">Perishable items have 12h & Non-Perishable items have 48h "Chope Window"</p>
            </p>
            <b-form-select v-model="selected" class="mb-3" style="width: 100%">
              <!-- <b-form-select-option :value="null" selected>Categories Available</b-form-select-option> -->
              <b-form-select-option value="a">Perishable</b-form-select-option>
              <b-form-select-option value="b">Non-Perishable</b-form-select-option>
            </b-form-select>
          </div>

          <div class="col-md-6">
            <p class="mb-1">Category of Food: </p>
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
              type="number"
              placeholder="Input Price"
              aria-label="number"
              style="width: 100%;"
            />
          </div>

          <div class="col-md-6">
            <p class="mb-1">Quantity: </p>
            <input
              class="d-inline form-control me-2 mb-3"
              type="number"
              placeholder="Input Quantity"
              aria-label="number"
              style="width: 100%;"
            />
          </div>
        </div>

        <div class="row d-flex">
          <div class="col-10"></div>
          <div class="col justify-end">
            <button class="btn w-100 btn-success" type="submit">
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

  #moreInfo{
    font-size: 12px;
    display: none;
  }

  .infoIcon:hover + #moreInfo{
    display: inline;
    color: green;
  }

</style>