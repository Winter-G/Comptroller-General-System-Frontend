<template>
  <div class="dashboard-container">
    <h2 class="title">COMMUNICATION</h2>
    <h4 class="subtitle">(Tower, Antenna, Transmitter)</h4>
    <div class="image-container">

      <!-- In a Sports Complex -->
      <div class="image-wrapper">
        <router-link to="/communication/own-station/basic-info" class="image-link">
          <img :src="ownStation" alt="Own Station" class="own-station-img" />
        </router-link>
        <!-- Notice below image -->
        <div class="alert alert-info my-3">
          If a institution own a Communication Stations such as ITN- Head Office and its main Components such as Tower, Antenna, Transmitter, etc. should be recorded here.
        </div>
      </div>

      <!-- Not in a sports complex -->
      <div class="image-wrapper">
        <router-link to="/communication/station-facilities-outsourced" class="image-link">
          <img :src="stationFacilitiesOutsourced" alt="Station Facilities Outsourced" class="station-facilities-outsourced-img" />
        </router-link>
        <!-- Notice below image -->
        <div class="alert alert-info my-3">
          If a institution use communication  Facilities such as Tower, Antenna, Transmitter, etc. which are located in a Communication station Owned by Another Party should be recorded here.
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ownStation from "@/assets/img/own_station.png";
import stationFacilitiesOutsourced from "@/assets/img/station_facilities_outsourced.png";

export default {
  name: "CommunicationDashboard",
  data() {
    return {
      ownStation,
      stationFacilitiesOutsourced,
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

