<template>
  <div class="sections-modal-wrapper position-relative">

    <!--Close Button-->
    <button class="close-btn" @click="closePopup">&times;</button>

    <div class="sections-modal card shadow p-4">
      <!-- No of Sections -->
      <h5><b>No of Sections</b></h5>
      <select v-model="noOfSections" class="form-select mb-3" required>
        <option value="">Select</option>
        <option v-for="n in 100" :key="n" :value="n">{{ n }}</option>
      </select>

      <!-- Single Section Display -->
      <div v-if="currentSection" class="section-block mb-4 border rounded p-3">
        <h6><b>Section {{ currentSectionIndex + 1 }}</b></h6>
        <!-- Section Name -->
        <div class="form-row">
          <label><b>Section Name</b></label>
          <input type="text" v-model="currentSection.name" maxlength="50" class="form-control" required />
        </div>
        <!-- Section Length -->
        <div class="form-row">
          <label><b>Section Length (Km)</b></label>
          <input type="text" v-model="currentSection.length" @input="validateDecimal($event, currentSection, 'length')" class="form-control" required />
        </div>
        <!-- No of Tracks -->
        <div class="form-row">
          <label><b>No of Tracks</b></label>
          <select v-model="currentSection.noOfTracks" class="form-select" required>
            <option value="">Select</option>
            <option v-for="t in 10" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <!-- Single Track Display -->
        <div v-if="currentTrack" class="track-block border p-3 mt-2 rounded">
          <h6><b>Track {{ currentTrackIndex + 1 }}</b></h6>
          <div class="form-row">
            <label><b>Identification No of the Track</b></label>
            <input type="text" v-model="currentTrack.id" maxlength="20" class="form-control" required />
          </div>
          <div class="form-row">
            <label><b>Track Length (Km)</b></label>
            <input type="text" v-model="currentTrack.length" @input="validateDecimal($event, currentTrack, 'length')" class="form-control" required />
          </div>
        </div>
      </div>

      <!-- NEXT Button -->
      <div class="d-flex justify-content-end mt-4">
        <button class="btn btn-primary" @click="goToConstruction">NEXT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["formData"],
  data() {
    return {
      noOfSections: "",
      sections: [],
      currentSectionIndex: 0,
      currentTrackIndex: 0
    };
  },
  computed: {
    currentSection() {
      return this.sections[this.currentSectionIndex];
    },
    currentTrack() {
      return this.currentSection?.tracks?.[this.currentTrackIndex] || null;
    }
  },
  watch: {
    noOfSections(newVal) {
      if (!newVal) {
        this.sections = [];
        this.currentSectionIndex = 0;
        this.currentTrackIndex = 0;
        return;
      }
      this.sections = Array.from({ length: newVal }, () => ({
        name: "",
        length: "",
        noOfTracks: "",
        tracks: []
      }));
      this.currentSectionIndex = 0;
      this.currentTrackIndex = 0;
    },
    sections: {
      deep: true,
      handler(newSections) {
        // Keep tracks in sync with noOfTracks
        newSections.forEach((section) => {
          const requiredTracks = parseInt(section.noOfTracks) || 0;
          if (section.tracks.length > requiredTracks) {
            section.tracks = section.tracks.slice(0, requiredTracks);
          } else {
            while (section.tracks.length < requiredTracks) {
              section.tracks.push({ id: "", length: "" });
            }
          }
        });
      }
    }
  },
  methods: {
    validateDecimal(event, obj, field) {
      let value = event.target.value.replace(/[^0-9.]/g, "");
      const regex = /^\d*\.?\d{0,2}$/;
      if (!regex.test(value)) {
        value = value.slice(0, -1);
      }
      obj[field] = value;
    },
    goToConstruction() {
      if (!this.currentSection.name || !this.currentSection.length || !this.currentSection.noOfTracks) {
        alert("Please fill all section fields!");
        return;
      }

      if (!this.currentTrack.id || !this.currentTrack.length) {
        alert("Please fill all track fields!");
        return;
      }

      console.log(`Track saved:`, this.currentTrack);

      // Go to construction page
      this.$router.push({ name: "ConstructionStatus" });
    },
    // Called after saving in construction page
    nextAfterConstruction() {
      if (this.currentTrackIndex < this.currentSection.tracks.length - 1) {
        // Move to next track in same section
        this.currentTrackIndex++;
      } else if (this.currentSectionIndex < this.sections.length - 1) {
        // Move to next section
        this.currentSectionIndex++;
        this.currentTrackIndex = 0;
      } else {
        console.log("All sections and tracks completed!");
      }
    },
    closePopup() {
      this.$emit("close"); 
    }
  }
};
</script>

<style scoped>
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 12px;
}
.form-row label {
  min-width: 220px;
  font-weight: bold;
}
.form-row input,
.form-row select {
  flex: 1;
}
.section-block {
  background: #f8f9fa;
}
.track-block {
  background: #fff;
}
.close-btn {
  position: absolute;
  top: -50px;  
  right: -10px; 
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}
</style>





