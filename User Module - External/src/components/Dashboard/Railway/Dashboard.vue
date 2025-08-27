<template>
  <div class="dashboard-container">
    <h2 class="title">RAILWAY</h2>
    <div class="image-container">

      <router-link to="/railway/line" class="image-link">
        <img :src="railwayLine" alt="Railway Line" class="railway-img" />
      </router-link>

      <router-link to="/railway/subway" class="image-link">
        <img :src="subway" alt="Railway Subway" class="railway-img" />
      </router-link>

      <router-link to="/railway/mono-rail" class="image-link">
        <img :src="monoRail" alt="Mono Rail" class="railway-img" />
      </router-link>

      <router-link to="/railway/signal" class="image-link">
        <img :src="railwaySignal" alt="Railway Signal" class="railway-img" />
      </router-link>

    </div>
  </div>
</template>

<script>
import railwayLine from "@/assets/img/railway_line.png";
import subway from "@/assets/img/subway.png";
import monoRail from "@/assets/img/mono_rail.png";
import railwaySignal from "@/assets/img/railway_signal.png";

export default {
  name: "Dashboard",
  data() {
    return {
      railwayLine,
      subway,
      monoRail,
      railwaySignal,
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
  grid-template-columns: repeat(4, 325px); 
  justify-content: center;                 
  gap: 1px;                                
}

.image-link {
  display: block;
  margin: 0;
  padding: 0;
  line-height: 0;
}

.image-link:hover {
  transform: translateY(-6px);
}

.railway-img {
  width: 325px;
  height: 325px;
  object-fit: contain;
  display: block;
}
</style>







