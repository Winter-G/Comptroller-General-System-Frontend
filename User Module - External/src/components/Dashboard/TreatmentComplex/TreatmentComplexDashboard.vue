<template>
  <div class="dashboard-container">
    <h2 class="title">TREATMENT COMPLEX</h2>
    <div class="image-container">

      <!-- Water -->
      <div class="image-wrapper">
        <router-link to="/treatment-complex/water" class="image-link">
          <img :src="water" alt="Water" class="water-img" />
        </router-link>
      </div>

      <!-- Sewerage -->
      <div class="image-wrapper">
        <router-link to="/treatment-complex/sewerage" class="image-link">
          <img :src="sewerage" alt="Sewerage" class="sewerage-img" />
        </router-link>
      </div>

      <!-- Drainage -->
      <div class="image-wrapper">
        <router-link to="/treatment-complex/drainage" class="image-link">
          <img :src="drainage" alt="Drainage" class="drainage-img" />
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import water from "@/assets/img/water.png";
import sewerage from "@/assets/img/sewerage.png";
import drainage from "@/assets/img/drainage.png";

export default {
  name: "TreatmentComplexDashboard",
  data() {
    return {
      water,
      sewerage,
      drainage,
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

.water-img {
  width: 325px;
  height: 325px;
  object-fit: contain;
  display: block;
}

.sewerage-img {
  width: 325px;
  height: 325px;
  object-fit: contain;
  display: block;
}

.drainage-img {
  width: 325px;
  height: 325px;
  object-fit: contain;
  display: block;
}
</style>
