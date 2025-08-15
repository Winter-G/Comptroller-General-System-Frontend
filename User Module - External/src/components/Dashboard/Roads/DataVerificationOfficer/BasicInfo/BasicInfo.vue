<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4 basicInfo-card">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="row w-100">
          <!-- Left Column -->
          <div class="col-12 col-lg-6">
            <div class="form-section">
              <h5 class="section-title">Road - Basic Information</h5>

              <!-- Institution Name -->
              <div class="mb-3">
                <label for="institutionName" class="form-label">Institution Name</label>
                <input type="text" id="institutionName" class="form-control" v-model="formData.institutionName" required />
              </div>

              <!-- Institutional Sector -->
              <div class="mb-3">
                <label for="institutionalSector" class="form-label">Institutional Sector</label>
                <input type="text" id="institutionalSector" class="form-control" v-model="formData.institutionalSector" required />
              </div>

              <!-- Notice -->
              <div class="alert alert-info mb-4">
                Before proceeding, please check whether your Institution Name and the Institutional Sector shown here are correct.
              </div>

              <!-- Assets Code -->
              <div class="mb-3">
                <label class="col-md-4 text-black p-2">Assets Code</label>
                <div class="col-md-8">
                  <select class="form-control">
                    <option value="">Select Code</option>
                  </select>
                </div>
              </div>

              <!-- Assets Type -->
              <div class="mb-3">
                <label class="col-md-4 text-black p-2">Type (Class)</label>
                <div class="col-md-8">
                  <select class="form-control">
                    <option disabled selected>Select</option>
                    <option>E</option>
                    <option>A</option>
                    <option>AB</option>
                    <option>AC</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>Approach</option>
                    <option>None</option>
                  </select>
                </div>
              </div>

              <!-- No. -->
              <div class="mb-3">
                <label for="no" class="form-label">No.</label>
                <input type="text" id="no" maxlength="7" class="form-control" v-model="formData.no" required />
              </div>

              <!-- Name -->
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" id="name" maxlength="50" class="form-control" v-model="formData.name" required />
              </div>

              <!-- Location (Start) -->
              <div class="mb-3">
                <label class="form-label" id="locationStartLabel">Location (Start)</label>
                <div class="row g-2">
                  <div class="col-12 col-sm-6">
                    <label for="districtStart" class="form-label">District</label>
                    <select class="form-select" id="districtStart" v-model="formData.locationStart.district">
                      <option value="">Select District</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="dsDivisionStart" class="form-label">DS Division</label>
                    <select class="form-select" id="dsDivisionStart" v-model="formData.locationStart.dsDivision">
                      <option value="">Select DS Division</option>
                    </select>
                  </div>
                </div>
                <div class="row g-2 mt-1">
                  <div class="col-12 col-sm-6">
                    <label for="gnDivisionStart" class="form-label">GN Division</label>
                    <select class="form-select" id="gnDivisionStart" v-model="formData.locationStart.gnDivision">
                      <option value="">Select GN Division</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="coordinatesStart" class="form-label">Coordinates</label>
                    <select class="form-select" id="coordinatesStart" v-model="formData.locationStart.coordinates">
                      <option value="">Select Coordinates</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6 mt-2">
                    <label for="kmPostStart" class="form-label">Km Post</label>
                    <select class="form-select" id="kmPostStart" v-model="formData.locationStart.kmPost">
                      <option value="">Select Km Post</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Location (End) -->
              <div class="mb-3">
                <label class="form-label" id="locationEndLabel">Location (End)</label>
                <div class="row g-2">
                  <div class="col-12 col-sm-6">
                    <label for="districtEnd" class="form-label">District</label>
                    <select class="form-select" id="districtEnd" v-model="formData.locationEnd.district">
                      <option value="">Select District</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="dsDivisionEnd" class="form-label">DS Division</label>
                    <select class="form-select" id="dsDivisionEnd" v-model="formData.locationEnd.dsDivision">
                      <option value="">Select DS Division</option>
                    </select>
                  </div>
                </div>
                <div class="row g-2 mt-1">
                  <div class="col-12 col-sm-6">
                    <label for="gnDivisionEnd" class="form-label">GN Division</label>
                    <select class="form-select" id="gnDivisionEnd" v-model="formData.locationEnd.gnDivision">
                      <option value="">Select GN Division</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label for="coordinatesEnd" class="form-label">Coordinates</label>
                    <select class="form-select" id="coordinatesEnd" v-model="formData.locationEnd.coordinates">
                      <option value="">Select Coordinates</option>
                    </select>
                  </div>
                  <div class="col-12 col-sm-6 mt-2">
                    <label for="kmPostEnd" class="form-label">Km Post</label>
                    <select class="form-select" id="kmPostEnd" v-model="formData.locationEnd.kmPost">
                      <option value="">Select Km Post</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- Right Column -->
          <div class="col-12 col-lg-6">
            <div class="form-section">

              <!-- Length(Km) -->
              <div class="mb-3">
                <label for="lengthKm" class="form-label">Length (Km)</label>
                <div class="col-md-4">
                  <input id="lengthKm" class="form-control" type="text" v-model="formData.lengthKm" @input="validateDecimal($event, 'lengthKm')" />
                </div>
              </div>

              <!-- Road Surfacing -->
              <div class="col-12 col-sm-6 mt-2 mb-4">
                <label for="roadSurfacing" class="form-label d-block">Road Surfacing (by Majority)</label>
                <div class="d-flex align-items-center gap-2">
                  <select class="form-select" id="roadSurfacing" v-model="formData.roadSurfacing" style="width: 250px;">
                    <option value="">Select Road Surfacing</option>
                    <option>Double Bituminous Surface Treatment(DBST)</option>
                    <option>Asphalt Concrete (ABC)</option>
                    <option>Macadam</option>
                    <option>Concrete</option>
                    <option>Interlock Paving</option>
                    <option>Gravel</option>
                    <option>Mixed</option>
                    <option>Other</option>
                  </select>
                  <input v-if="formData.roadSurfacing === 'Other'" type="text" id="roadSurfacingOther" class="form-control" v-model="formData.roadSurfacingOther" maxlength="50" placeholder="Specify" style="width: 250px;" />
                </div>
              </div>

              <!-- Notice -->
              <div class="alert alert-info mb-4">
                Road Furniture's such as Signal lights/ Road Markings/ Street Lights/ Gantry / Pelican crossings/ Bus Halts / Bill boards/ Railings are considered to be included as part of Road. Maintenance of each item can be included in the maintenance sub field separately, mentioning the name in description under maintenance.
              </div>

              <!-- Measurement Unit -->
              <div class="inline-fields">
                <div class="form-inline-group">
                  <label for="unit">Measurement Unit</label>
                  <select id="unit" v-model.trim="road.unit" @change="convertToKm2" class="form-select">
                    <option disabled value="">Select Unit</option>
                    <option>Square Meters (m²)</option>
                    <option>Square Kilometers (km²)</option>
                    <option>Square Miles (mi²)</option>
                    <option>Square Yards (yd²)</option>
                    <option>Square Feet (ft²)</option>
                    <option>Hectares (Ha)</option>
                    <option>Acres (ac)</option>
                    <option>Perches</option>
                  </select>
                </div>
                <div class="form-inline-group">
                  <label for="area">Area</label>
                  <input id="area" v-model.trim="road.area" @input="onAreaInput" required class="form-control" />
                </div>
                <div class="form-inline-group">
                  <label for="areaKm">Area (km²)</label>
                  <input id="areaKm" :value="road.areaKm" disabled class="form-control" />
                </div>
                <div class="form-inline-group">
                  <label for="landOwnership">Land Ownership</label>
                  <select id="landOwnership" v-model.trim="road.landOwnership" class="form-select">
                    <option disabled value="">Select Ownership</option>
                    <option>Own</option>
                    <option>Own by Other Party</option>
                  </select>
                </div>
                <div class="form-inline-group" :class="{ hidden: road.landOwnership !== 'Own by Other Party' }">
                  <label for="landOwner">Land Owner</label>
                  <input id="landOwner" v-model.trim="road.landOwner" class="form-control" />
                </div>
              </div>

              <!-- Notice -->
              <div class="alert alert-info mt-4 mb-4">
                Own (Transfer in) = Structure Constructed by another Institution and Transferred free of charge to your Institution Own (Transfer out) = Structure Constructed by your Institution and transferred to another Institution free of charge
              </div>

              <!-- Ownership Section -->
              <div class="mb-3">
                <label class="text-black p-2 ownership-label">Ownership</label>
                <select v-model="formData.ownership" class="form-control">
                  <option disabled value="">Select Ownership</option>
                  <option>Own</option>
                  <option>Own (Transfer in)</option>
                  <option>Own (Transfer out)</option>
                  <option>Leased</option>
                  <option>Rented</option>
                  <option>Leased out</option>
                  <option>Rented out</option>
                </select>
              </div>

              <!-- Own (Transfer in) -->
              <div v-if="formData.ownership === 'Own (Transfer in)'" class="form-group row mb-3">
                <label class="col-md-4 text-black p-2">From Whom</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="formData.fromWhom" maxlength="50" />
                </div>
              </div>

              <!-- Own (Transfer out) -->
              <div v-if="formData.ownership === 'Own (Transfer out)'" class="form-group row mb-3">
                <label class="col-md-4 text-black p-2">To Whom</label>
                <div class="col-md-8">
                  <input type="text" class="form-control" v-model="formData.toWhom" maxlength="50" />
                </div>
              </div>

              <!-- Leased / Rented -->
              <div v-if="['Leased', 'Rented'].includes(formData.ownership)">
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">From Whom</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="formData.fromWhom" maxlength="50" />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Period</label>
                  <div class="col-md-4">From
                    <input type="month" class="form-control" v-model="formData.periodFrom" />
                  </div>
                  <div class="col-md-4">To
                    <input type="month" class="form-control" v-model="formData.periodTo" />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Payment Method</label>
                  <div class="col-md-8">
                    <select class="form-control" v-model="formData.paymentMethod">
                      <option disabled value="">Select Method</option>
                      <option>One time payment</option>
                      <option>Yearly payment</option>
                      <option>Monthly payment</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Payment (Rs. Million)</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="formData.payment" @blur="validateDecimal($event, 'payment')" />
                  </div>
                </div>
              </div>

              <!-- Leased out / Rented out -->
              <div v-if="['Leased out', 'Rented out'].includes(formData.ownership)">
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">To Whom</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="formData.toWhom" maxlength="50" />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Period</label>
                  <div class="col-md-4">From
                    <input type="month" class="form-control" v-model="formData.periodFrom" />
                  </div>
                  <div class="col-md-4">To
                    <input type="month" class="form-control" v-model="formData.periodTo" />
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Payment Method</label>
                  <div class="col-md-8">
                    <select class="form-control" v-model="formData.paymentMethod">
                      <option disabled value="">Select Method</option>
                      <option>One time payment</option>
                      <option>Yearly payment</option>
                      <option>Monthly payment</option>
                    </select>
                  </div>
                </div>
                <div class="form-group row mb-3">
                  <label class="col-md-4 text-black p-2">Income (Rs. Million)</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="formData.income" @blur="validateDecimal($event, 'income')" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        institutionName: '',
        institutionalSector: '',
        no: '',
        name: '',
        locationStart: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        locationEnd: { district: '', dsDivision: '', gnDivision: '', coordinates: '', kmPost: '' },
        lengthKm: '',
        roadSurfacing: '',
        roadSurfacingOther: '',
        ownership: '',
        fromWhom: '',
        toWhom: '',
        periodFrom: '',
        periodTo: '',
        paymentMethod: '',
        payment: '',
        income: ''
      },
      road: { unit: '', area: '', areaKm: '', landOwnership: '', landOwner: '' }
    }
  },
  methods: {
    validateDecimal(event, field) {
      let value = typeof event === 'string' ? event : event.target.value;
      const regex = /^\d*\.?\d{0,2}$/;
      if (!regex.test(value)) { value = value.slice(0, -1); }
      if (field) this.formData[field] = value; else this.formData.lengthKm = value;
    },
    convertToKm2() {
      if (this.road.unit === 'Square Kilometers (km²)') { this.road.areaKm = this.road.area; } 
      else { this.road.areaKm = ''; }
    },
    onAreaInput() {
      const regex = /^\d*\.?\d{0,2}$/;
      if (!regex.test(this.road.area)) { this.road.area = this.road.area.slice(0, -1); }
      this.convertToKm2();
    }
  }
}
</script>

<style scoped>
.mb-3 > .d-flex {
  align-items: center; 
}
.mb-3 > .d-flex > label {
   white-space: nowrap; 
   padding-top: 6px; 
   font-weight: 700; 
  }
.mb-3 > .d-flex > select, 
.mb-3 > .d-flex > input {
   flex: 1 1 250px; 
   max-width: 250px; 
   font-weight: 600; 
}

.inline-fields {
   display: flex; 
   flex-wrap: wrap; 
   gap: 16px; 
}
.form-inline-group { 
  display: flex; 
  flex-direction: column; 
  flex: 1 1 45%; 
  min-width: 200px; 
}
.form-inline-group label { 
  margin-bottom: 4px; 
  font-weight: 700; 
}
.form-inline-group input, 
.form-inline-group select { 
  padding: 6px 12px; 
  font-size: 16px; 
  font-weight: 600; 
}

.hidden {
   display: none; 
  }
.error-message {
   color: red; 
   font-size: 14px; 
  }

#locationStartLabel, 
#locationEndLabel {
   font-weight: 700; 
}
label[for="lengthKm"], 
label[for="roadSurfacing"], 
label[for="name"], 
label[for="no"],
label.col-md-4.text-black.p-2, 
label[for="institutionName"], 
label[for="institutionalSector"] {
   font-weight: 700; 
}

.ownership-label { font-weight: 700; }
</style>
