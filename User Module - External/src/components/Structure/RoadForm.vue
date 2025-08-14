<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <form @submit.prevent="handleSubmit" class="form-container">
          <div class="row">
            <!-- Left Column -->
            <div class="col-12 col-lg-6">
              <div class="form-section">
                <h5 class="section-title">Basic Information</h5>

                <!-- Institution Name -->
                <div class="mb-3">
                  <label for="institutionName" class="form-label">Institution Name</label>
                  <input
                    type="text"
                    id="institutionName"
                    class="form-control"
                    v-model="formData.institutionName"
                    required
                  />
                </div>


                <!-- Institutional Sector -->
                <div class="mb-3">
                  <label for="institutionalSector" class="form-label">Institutional Sector</label>
                  <input
                    type="text"
                    id="institutionalSector"
                    class="form-control"
                    v-model="formData.institutionalSector"
                    required
                  />
                </div>

                 <!-- Notice -->
                  <div class="alert alert-info mb-4">
                    Before proceed, please check whether your Institution Name
                    and the Institutional Sector shown here is Correct.
                  </div>

                <!-- Assets Code -->
                  <div class="mb-3">
                    <label for="assetsCode" class="form-label"
                      >Assets Code</label
                    >
                    <select
                      class="form-select"
                      :class="{ 'is-invalid': errors.assetsCode }"
                      id="assetsCode"
                      v-model="form.assetsCode"
                      @change="handleAssetCodeChange"
                    >
                      <option value="">Select Assets Code</option>
                      <option
                        v-for="code in assetsCodeOptions"
                        :key="code.value"
                        :value="code.value"
                      >
                        {{ code.label }}
                      </option>
                    </select>
                    <div v-if="errors.assetsCode" class="invalid-feedback">
                      {{ errors.assetsCode }}
                    </div>
                  </div>

                <!-- City -->
                <div class="mb-3">
                  <label for="city" class="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    class="form-control"
                    v-model="formData.city"
                    required
                  />
                </div>

                <!-- State -->
                <div class="mb-3">
                  <label for="state" class="form-label">State</label>
                  <input
                    type="text"
                    id="state"
                    class="form-control"
                    v-model="formData.state"
                    required
                  />
                </div>

                <!-- Zip Code -->
                <div class="mb-3">
                  <label for="zipCode" class="form-label">Zip Code</label>
                  <input
                    type="text"
                    id="zipCode"
                    class="form-control"
                    v-model="formData.zipCode"
                    required
                  />
                </div>
              </div>
            </div>

            <!-- You can add more columns here if needed -->
          </div>
          <!-- Submit Button -->
          <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

