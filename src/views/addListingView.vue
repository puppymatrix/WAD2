<script setup></script>

<template>
  <main>
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

    <div class="m-5">
      <form class="d-inline m-2" role="search">
        <button id="upload" class="btn btn-outline-success" type="submit">
          Upload images
        </button>
      </form>

      <form class="d-inline" role="search">
        <button class="btn btn-outline-success" type="submit">
          <img src="../assets/red_pin_tag.jpg" style="width: 20px;">
          Map View
        </button>
      </form>
    </div>

    <form class="m-5">

      <p class="mb-1">Name of Listing: </p>
      <input
        class="form-control me-2 mb-3"
        type="search"
        placeholder="Input Name of Listing"
        aria-label="Search"
      />

      <p class="mb-1">Description of Listing: </p>
      <input
        class="form-control me-2 mb-3"
        type="search"
        placeholder="Input Description of Listing"
        aria-label="Search"
      />

      <div class="d-inline">
        <p class="mb-1">Location: </p>
        <input
          class="d-inline form-control me-2 mb-3"
          type="search"
          placeholder="Input Location"
          aria-label="Search"
          style="width: 50%;"
        />
      </div>

      <div class="d-inline">

        <p class="mb-1">Category: </p>
        <b-form-select v-model="selected" class="mb-3" style="width: 50%">
          <!-- <b-form-select-option :value="null">Categories Available</b-form-select-option> -->
          <b-form-select-option value="a">Fresh fruits</b-form-select-option>
          <b-form-select-option value="b">Fresh vegetables</b-form-select-option>
          <b-form-select-option value="c">Leftover cooked food</b-form-select-option>
        </b-form-select>

      </div>


      <p class="mb-1">Price: </p>
      <input
        class="d-inline form-control me-2 mb-3"
        type="search"
        placeholder="Input Price"
        aria-label="Search"
        style="width: 50%;"
      />

      <p class="mb-1">Quantity: </p>
      <input
        class="d-inline form-control me-2 mb-3"
        type="search"
        placeholder="Input Quantity"
        aria-label="Search"
        style="width: 50%;"
      />

      <button class="btn btn-success d-block" type="submit">
          Post Listing
      </button>
      
    </form>
   
  </main>
</template>


<style>

  #upload{
    margin-left: 10px;
  }

</style>