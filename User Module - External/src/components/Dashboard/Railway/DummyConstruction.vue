<!-- DummyConstruction.vue -->
<template>
  <div class="container mt-5 text-center">
    <h3>Dummy Construction Page</h3>
    <p>Section details saved here.</p>
    <button class="btn btn-success mt-3" @click="goBack">
      SAVE
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      // Redirect back to SectionsModal page
      this.$router.push({ name: "SectionsModal" });
    },
  },
};
</script>

<style scoped>
h3 {
  margin-bottom: 15px;
}
</style>

