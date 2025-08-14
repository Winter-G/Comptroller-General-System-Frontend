<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content completed-container">
      <span class="close-button" @click="closeModal">&times;</span>

      <!-- SIN Number Display -->
      <div class="form-group-row" v-if="sessionSinNumber">
        <label>SIN Number</label>
        <input
          type="text"
          :value="sessionSinNumber"
          readonly
          class="short-input sin-display"
        />
      </div>

      <div class="form-group-row">
        <label>Started Year</label>
        <select v-model="startedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="startedYearStatus === 'Known'"
          type="text"
          v-model="startedYear"
          maxlength="4"
          @input="validateYear('startedYear')"
          placeholder="e.g., 2020"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Completed Year</label>
        <select v-model="completedYearStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="completedYearStatus === 'Known'"
          type="text"
          v-model="completedYear"
          maxlength="4"
          @input="validateYear('completedYear')"
          placeholder="e.g., 2023"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Construction Cost (Rs. Million)</label>
        <select v-model="costStatus" class="short-select">
          <option value="Known">Known</option>
          <option value="Unknown">Unknown</option>
        </select>
        <input
          v-if="costStatus === 'Known'"
          type="text"
          v-model="constructionCost"
          @input="formatCost"
          placeholder="e.g., 1,000.000"
          class="short-input"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Source of Funding</th>
            <th>Type of Funding</th>
            <th>Amount (Rs. Million)</th>
            <th>
              Foreign Funding – Agency /Country /Local Funding - Institution
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(fund, index) in fundingList" :key="index">
            <td></td>
            <td>
              <select v-model="fund.type">
                <option disabled value="">Select</option>
                <option>Consolidated Fund</option>
                <option>Foreign Funding (Grant)</option>
                <option>Foreign Funding (Loan)</option>
                <option>Local Funding (Self)</option>
                <option>Local Funding (Loan)</option>
                <option>Local Funding (Grant)</option>
                <option>Provincial Council Funding</option>
                <option>Other (Pls. specify)</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                v-model="fund.amount"
                @input="validateDecimal(fund, index)"
              />
            </td>
            <td>
              <input
                v-if="showAgencyField(fund.type)"
                v-model="fund.agency"
                maxlength="50"
              />
            </td>
          </tr>
          <tr>
            <td colspan="2"><strong>Total (Rs. Million)</strong></td>
            <td colspan="3">
              <input type="text" :value="totalAmount" readonly />
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="addFundingRow">Add</button>

      <div class="form-group-row">
        <label>Name of the Contractors</label>
        <input
          type="text"
          v-model="contractors"
          maxlength="100"
          class="short-input"
        />
      </div>

      <div class="form-group-row">
        <label>Name of the Consultants</label>
        <input
          type="text"
          v-model="consultants"
          maxlength="100"
          class="short-input"
        />
      </div>

      <div class="form-actions">
        <button @click="saveAndRedirect">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import authHeader from "@/services/Auth&UserServices/auth-header";

export default {
  name: "CompletedConstructionModal",
  props: {
    componentRoute: String,
    sinNumber: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showModal: true,
      startedYearStatus: "",
      completedYearStatus: "",
      costStatus: "",
      startedYear: "",
      completedYear: "",
      constructionCost: "",
      contractors: "",
      consultants: "",
      fundingList: [{ source: "", type: "", amount: "", agency: "" }],
      sessionSinNumber: "", // Store SIN from session
    };
  },
  mounted() {
    // Get SIN number from session storage or props
    this.sessionSinNumber =
      this.sinNumber || 
      sessionStorage.getItem("sinCode") ||
      sessionStorage.getItem("airfieldSinNumber") || 
      sessionStorage.getItem("generatedSinCode") ||
      localStorage.getItem("sinCode") ||
      "";

    // If we have a SIN number from props, store it in session
    if (this.sinNumber) {
      sessionStorage.setItem("airfieldSinNumber", this.sinNumber);
      this.sessionSinNumber = this.sinNumber;
    }

    console.log('Retrieved SIN number:', this.sessionSinNumber);
  },
  computed: {
    totalAmount() {
      return this.fundingList
        .reduce((sum, fund) => {
          const amount = parseFloat(fund.amount);
          return sum + (isNaN(amount) ? 0 : amount);
        }, 0)
        .toFixed(3);
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    validateYear(field) {
      this[field] = this[field].replace(/[^0-9]/g, "").slice(0, 4);
    },
    formatCost() {
      let val = this.constructionCost.replace(/[^0-9.]/g, "");
      const parts = val.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 3);
      }
      this.constructionCost = parts.join(".");
    },
    validateDecimal(fund, index) {
      fund.amount = fund.amount
        .replace(/[^0-9.]/g, "")
        .replace(/(\..*?)\..*/g, "$1");
      const parts = fund.amount.split(".");
      if (parts.length === 2) {
        parts[1] = parts[1].slice(0, 3);
        fund.amount = parts[0] + "." + parts[1];
      }
    },
    addFundingRow() {
      this.fundingList.push({ source: "", type: "", amount: "", agency: "" });
    },
    showAgencyField(type) {
      return [
        "Foreign Funding (Grant)",
        "Foreign Funding (Loan)",
        "Local Funding (Loan)",
        "Local Funding (Grant)",
        "Other (Pls. specify)",
      ].includes(type);
    },
    saveAndRedirect() {
      // Validate SIN number
      if (!this.sessionSinNumber) {
        Swal.fire({
          icon: "error",
          title: "SIN Number Required",
          text: "SIN number is missing. Please complete the airfield runway form first.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      const isValid =
        this.startedYearStatus &&
        (this.startedYearStatus === "Unknown" || this.startedYear) &&
        this.completedYearStatus &&
        (this.completedYearStatus === "Unknown" || this.completedYear) &&
        this.costStatus &&
        (this.costStatus === "Unknown" || this.constructionCost) &&
        this.fundingList.every((fund) => {
          return (
            fund.type &&
            fund.amount &&
            (this.showAgencyField(fund.type) ? fund.agency : true)
          );
        });

      if (!isValid) {
        Swal.fire({
          icon: "warning",
          title: "Please fill all required fields",
          text: "Please ensure all fields are filled correctly.",
          confirmButtonText: "Okay",
          confirmButtonColor: "#4c59b0",
        });
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonColor: "#4c59b0",
        cancelButtonColor: "#333",
        confirmButtonText: "Yes, I confirm this!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Clean and prepare the data
            const cleanConstructionCost = this.constructionCost ? 
              parseFloat(this.constructionCost.replace(/,/g, '')) : null;

            // Prepare data for API
            const formData = {
              sinNumber: this.sessionSinNumber,
              startedYearStatus: this.startedYearStatus,
              completedYearStatus: this.completedYearStatus,
              costStatus: this.costStatus,
              startedYear: this.startedYearStatus === "Known" ? parseInt(this.startedYear) : null,
              completedYear: this.completedYearStatus === "Known" ? parseInt(this.completedYear) : null,
              constructionCost: this.costStatus === "Known" ? cleanConstructionCost : null,
              contractors: this.contractors || "",
              consultants: this.consultants || "",
              fundingList: this.fundingList.map(fund => ({
                source: fund.source || "",
                type: fund.type || "",
                amount: fund.amount ? parseFloat(fund.amount) : 0,
                agency: fund.agency || ""
              })),
              totalAmount: parseFloat(this.totalAmount)
            };

            console.log('Sending form data:', JSON.stringify(formData, null, 2));

            // Use the specific token that works for your system
            const headers = {
              Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJha3RoYXIiLCJpYXQiOjE3NTM2Nzc1MDcsImV4cCI6MTc1Mzc2MzkwN30.Tgj1l0S-E1H3iDsEAVv_08TEKbiH7S0ttHbdMUBrf6CCP99Y_IAbUN7NM-u4Ls9GVJs53dLaR63csdKvUbN1jg",
              "Content-Type": "application/json",
            };

            console.log('Request headers:', headers);

            // Call the API
            const response = await axios.post(
              "http://192.168.231.62/cgoconstructioncomplete/projects/save",
              formData,
              { headers }
            );

            console.log('API Response:', response.data);

            // Show success message
            Swal.fire({
              icon: "success",
              title: "Construction data saved successfully!",
              text: `SIN Number: ${this.sessionSinNumber}`,
              confirmButtonText: "Okay",
              confirmButtonColor: "#4c59b0",
            });

            this.$emit("saved", formData);
            this.$router.push("/construction/usage-info1");
          } catch (error) {
            console.error("Error saving form:", error);

            // Enhanced error logging
            if (error.response) {
              console.error('Response data:', error.response.data);
              console.error('Response status:', error.response.status);
              console.error('Response headers:', error.response.headers);
            }

            let errorTitle = "Error saving form";
            let errorMessage = "Something went wrong. Please try again.";

            if (error.response?.status === 401) {
              errorTitle = "Authentication Error";
              errorMessage =
                "Your session has expired or invalid credentials. Please refresh the page and login again, then try submitting the form.";
            } else if (error.response?.status === 400) {
              errorTitle = "Invalid Data";
              errorMessage =
                error.response.data?.message ||
                error.response.data?.error ||
                "Please check your form data and try again. Make sure all required fields are filled correctly.";
            } else if (error.response?.status === 403) {
              errorTitle = "Access Denied";
              errorMessage =
                "You don't have permission to perform this action.";
            } else if (error.response?.status >= 500) {
              errorTitle = "Server Error";
              errorMessage =
                "Server error occurred. Please try again later or contact support.";
            } else if (error.response?.data?.message) {
              errorMessage = error.response.data.message;
            }

            Swal.fire({
              icon: "error",
              title: errorTitle,
              text: errorMessage,
              confirmButtonText: "Okay",
              confirmButtonColor: "#4c59b0",
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 1200px;
  overflow-y: auto;
  max-height: 90vh;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 26px;
  font-weight: bold;
  color: #666;
  cursor: pointer;
}

.completed-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group-row label {
  font-weight: bold;
  min-width: 200px;
}

.short-select,
.short-input {
  max-width: 400px;
  flex: none;
}

.sin-display {
  background-color: #f5f5f5;
  border: 2px solid #4c59b0;
  font-weight: bold;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #aaa;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #e0e0e0;
}

button {
  width: fit-content;
  padding: 8px 16px;
  background-color: #5c6bc0;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3f51b5;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
