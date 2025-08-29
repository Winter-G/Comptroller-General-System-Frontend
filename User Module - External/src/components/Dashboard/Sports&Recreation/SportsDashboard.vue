<template>
  <div class="dashboard-container">
    <h2 class="title">SPORTS & RECREATION FACILITY</h2>
    <div class="image-container">

      <!-- In a Sports Complex -->
      <div class="image-wrapper">
        <router-link to="/sports-recreation/in-sports-complex" class="image-link">
          <img :src="inSportsComplex" alt="In Sports Complex" class="sportscomplex-img" />
        </router-link>
        <!-- Notice below image -->
        <div class="alert alert-info my-3">
          Sport Complexes such as Sugathadasa National Sports Complex and its main Components such as Indoor Stadium, Swimming Pool, Play Ground etc. should be recorded here.
        </div>
      </div>

      <!-- Not in a sports complex -->
      <div class="image-wrapper">
        <router-link to="/sports-recreation/not-in-sports-complex" class="image-link">
          <img :src="notInSportsComplex" alt="Not In Sports Complex" class="sportscomplex-img" />
        </router-link>
        <!-- Notice below image -->
        <div class="alert alert-info my-3">
          Sports Facilities such as Indoor Stadium, Swimming Pool, Play Ground etc. which are individually located (not in a Sport complex) should be recorded here.
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import inSportsComplex from "@/assets/img/in_sports_complex.png";
import notInSportsComplex from "@/assets/img/not_in_sports_complex.png";

export default {
  name: "SportsRecreationFacility",
  data() {
    return {
      inSportsComplex,
      notInSportsComplex,
    };
  },
};

</script>

<style scoped>
.dashboard-container {
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 26px;
  margin-bottom: 25px;
  font-weight: bold;
}

.image-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(325px, 1fr));
  justify-content: center;
  gap: 20px;
}

.image-wrapper {
  text-align: center;
}

.image-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-link:hover {
  transform: translateY(-6px);
}

.sportscomplex-img {
  width: 325px;
  height: 325px;
  object-fit: contain;
  display: block;
}
</style>
