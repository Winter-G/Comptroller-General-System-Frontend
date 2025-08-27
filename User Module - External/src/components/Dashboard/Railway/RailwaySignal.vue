<template>
  <div class="container mt-3">
    <form class="card shadow-sm p-4 railwayline-card">
      <!-- Institution Name -->
      <div class="form-row">
        <label><b>Institution Name:</b></label>
        <input type="text" v-model="formData.institutionName" class="form-control" disabled />
      </div>

      <!-- Institutional Sector -->
      <div class="form-row mt-2">
        <label><b>Institutional Sector:</b></label>
        <input type="text" v-model="formData.institutionalSector" class="form-control" disabled />
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        Before proceeding, please check whether your Institution Name and the Institutional Sector shown here are correct.
      </div>

      <!-- Assets Code -->
      <div class="form-row">
        <label><b>Assets Code:</b></label>
        <input type="text" v-model="formData.assetsCode" class="form-control" disabled />
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        Please Select the Railway Track, where the relevant Signal is located.
      </div>

      <!-- Identification -->
      <div class="form-row align-start">
        <label><b>Identification:</b></label>
        <div class="identification-fields">
          <div class="field-group">
            <label>Railway Line Name</label>
            <select v-model="formData.identification.railwayLineName" class="form-select" required>
              <option disabled value="">Select Railway Line Name</option>
              <option value="Main Line">Main Line</option>
            </select>
          </div>

          <div class="field-group">
            <label>Section</label>
            <select v-model="formData.identification.section" class="form-select" required>
              <option disabled value="">Select Section</option>
              <option value="Ragama - Rambukkana">Ragama - Rambukkana</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Total Number of Signals -->
      <div class="form-row">
        <label for="totalSignals"><b>Total Number of Signals</b></label>
        <input
          type="text"
          id="totalSignals"
          v-model="formData.totalSignals"
          class="form-control"
          required
          @input="validateNumbersOnly('totalSignals'); recalcUnknown()"
        />
      </div>

<!-- Type + No of Signals -->
<div class="row-grid-4 mt-3">
  <!-- Left header -->
  <div class="row-head" style="grid-row: span 2; display: flex; align-items: center;">
    <b>Type</b>
  </div>

  <!-- Column headers -->
  <div class="subfield">
    <label>No of Signals (Mechanical)</label>
    <input
      type="text"
      v-model="formData.type.mechanical"
      class="form-control"
      @input="validateNumbersOnlyNested('type','mechanical')"
    />
  </div>
  <div class="subfield">
    <label>No of Signals (Color Lights)</label>
    <input
      type="text"
      v-model="formData.type.colorLights"
      class="form-control"
      @input="validateNumbersOnlyNested('type','colorLights')"
    />
  </div>
  <div class="subfield">
    <label>No of Signals (Other)</label>
    <input
      type="text"
      v-model="formData.type.other"
      class="form-control"
      @input="validateNumbersOnlyNested('type','other')"
    />
  </div>
</div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        If there are no such Signals fill “0”.
      </div>

      <!-- Construction Cost Included -->
      <div class="row-grid-2 mt-3">
        <div class="row-head">
          <b>Signals of which Construction Cost included in the Railway Line Construction</b>
        </div>
        <div class="subfield">
          <label>Number of Signals</label>
          <input
            type="text"
            v-model="formData.constructionCost.signalsIncluded"
            class="form-control"
            required
            @input="validateNumbersOnlyNested('constructionCost','signalsIncluded'); recalcUnknown()"
          />
        </div>
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        If there are no such Signals fill “0” In both fields.
      </div>

      <!-- Construction Cost Known -->
      <div class="row-grid-3 mt-3">
        <div class="row-head">
          <b>
            Construction Cost Known Signals<br />
            (Cost Not included in the Railway Line Construction Cost)
          </b>
        </div>
        <div class="subfield">
          <label>Number of Signals</label>
          <input
            type="text"
            v-model="formData.knownCostSignals"
            class="form-control"
            required
            @input="validateNumbersOnly('knownCostSignals'); recalcUnknown()"
          />
        </div>
        <div class="subfield">
          <label>Cost (Rs.)</label>
          <input
            type="text"
            v-model="formData.constructionCost.signalsCost"
            class="form-control"
            required
            @input="validateNumbersOnlyNested('constructionCost','signalsCost')"
          />
        </div>
      </div>

      <!-- Construction Cost Unknown -->
      <div class="form-row mt-3">
        <label><b>Construction Cost Unknown Signals (Cost Not included in the Railway Line Construction Cost)</b></label>
        <input type="text" v-model="formData.unknownCostSignals" class="form-control" disabled />
      </div>

      <!-- Notice -->
      <div class="alert alert-info my-3">
        Information of Signals should be filled in the “Signal Information” sub fields.
      </div>

      <!-- Valuation -->
      <div class="form-row">
        <label><b>Valuation</b></label>
        <select v-model="formData.valuation" required @change="handleValuationChange" class="form-select">
          <option disabled value="">Select</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <!-- Valuation Value -->
      <div class="form-row">
        <label><b>Valuation Value (Rs. Million)</b></label>
        <input
          type="text"
          v-model="formData.valuationValue"
          class="form-control"
          required
          @input="validateNumbersOnly('valuationValue')"
        />
      </div>

      <!-- Date of Valuation -->
      <div class="form-row">
        <label><b>Date of Valuation</b></label>
        <input type="date" v-model="formData.valuationDate" class="form-control" required />
      </div>

      <!-- Remarks -->
      <div class="form-row">
        <label><b>Remarks (if any)</b></label>
        <input type="text" v-model="formData.remarks" maxlength="60" class="form-control" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        institutionName: '',
        institutionalSector: '',
        assetsCode: '6111304 – Railway Signal',
        identification: { railwayLineName: '', section: '' },
        totalSignals: '',
        type: { mechanical: '', colorLights: '', other: '' },
        constructionCost: { signalsIncluded: '', signalsCost: '' },
        knownCostSignals: '',
        unknownCostSignals: '',
        valuation: '',
        valuationValue: '',
        valuationDate: '',
        remarks: ''
      }
    }
  },
  methods: {
    validateNumbersOnly(field) {
      this.formData[field] = (this.formData[field] || '').toString().replace(/[^0-9]/g, '')
    },
    validateNumbersOnlyNested(parent, child) {
      this.formData[parent][child] = (this.formData[parent][child] || '').toString().replace(/[^0-9]/g, '')
    },
    recalcUnknown() {
      const total = parseInt(this.formData.totalSignals || 0)
      const included = parseInt(this.formData.constructionCost.signalsIncluded || 0)
      const known = parseInt(this.formData.knownCostSignals || 0)
      const result = total - (included + known)
      this.formData.unknownCostSignals = result >= 0 ? String(result) : '0'
    },
    handleValuationChange() {
      if (this.formData.valuation === 'No') {
        this.formData.valuationValue = '1'
        const today = new Date().toISOString().split('T')[0]
        this.formData.valuationDate = today
      } else {
        this.formData.valuationValue = ''
        this.formData.valuationDate = ''
      }
    }
  }
}
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}
.form-row label {
  min-width: 280px;
  font-weight: bold;
}
.form-row input,
.form-row select,
.form-row span {
  flex: 1;
}

.row-grid-4 {
  display: grid;
  grid-template-columns: 280px repeat(3, 1fr);
  grid-auto-rows: auto;
  gap: 12px;
  align-items: start;
}

.row-grid-3 {
  display: grid;
  grid-template-columns: 280px 1fr 1fr;
  gap: 12px;
  align-items: start;
}
.row-grid-2 {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 12px;
  align-items: start;
}

.row-head {
  display: flex;
  align-items: center;
  font-weight: bold;
}

.subfield {
  display: flex;
  flex-direction: column;
}
.subfield > label {
  font-weight: 600;
  text-align: left; 
  margin-bottom: 6px;
}

.identification-fields {
  display: flex;
  flex: 1;
  gap: 12px;
}
.field-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .row-grid-4,
  .row-grid-3,
  .row-grid-2 {
    grid-template-columns: 1fr;
  }
  .row-head {
    margin-bottom: 6px;
  }
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }
  .form-row label {
    min-width: 0;
  }
}
</style>

