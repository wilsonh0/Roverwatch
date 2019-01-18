<template>
  <div>
    <div>
      <v-flex lg8 offset-lg2>
        <h1 :class="textSize">{{ this.$route.name }}</h1>
        <br>
        <v-btn color="info" @click="dialog = true">Info</v-btn>
        <v-btn color="orange lighten-2" @click="randomDate">Random</v-btn>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-img :src="img" aspect-ratio="1.6" position="top center"></v-img>
            <v-card-title class="headline">{{ manifest.name }}</v-card-title>
            <v-card-text class="subheading text-capitalize">
              Status: {{ manifest.status }}
              <br>
              Launch date: {{ manifest.launch_date }}
              <br>
              Landing date: {{ manifest.landing_date }}
              <br>
              Sols on Mission: {{ manifest.max_sol }}
              <br>
              Last date archived: {{ manifest.max_date }}
              <br>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-layout row wrap>
          <v-checkbox
            color="red"
            v-for="(cam, i) in cams"
            v-model="filters"
            :label="cam"
            :value="cam"
            :key="i"
          ></v-checkbox>
        </v-layout>
        <v-menu
          :close-on-content-click="false"
          v-model="menu2"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          max-width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Date"
            prepend-icon="event"
            readonly
            class="headline"
          ></v-text-field>
          <v-date-picker
            v-model="date"
            @input="menu2 = false"
            :first-day-of-week="0"
            locale="en-us"
            :max="max_date"
            :min="min_date"
          ></v-date-picker>
        </v-menu>
      </v-flex>
    </div>
    <v-progress-linear :height="5" color="deep-orange darken-1" indeterminate v-if="loading"></v-progress-linear>
    <cards
      class="cards"
      v-if="checkType(photo.camera.name) & !loading"
      v-for="(photo, i) in photos"
      :key="i"
      :photo="photo"
      :cameraType="photo.camera.name"
    ></cards>
  </div>
</template>

<script>
import Cards from "../components/Cards";

export default {
  components: {
    Cards
  },
  data: () => ({
    dialog: false,
    photos: null,
    date: null,
    max_date: null,
    min_date: null,
    menu: false,
    modal: false,
    menu2: false,
    sol: null,
    loading: false,
    filters: null,
    cams: null,
    manifest: null,
    img: null
  }),
  created() {
    const key = this.$store.getters.getNasaKey;
    const name = this.$route.name;

    //Get cam info
    this.filters = this.$store.getters.getRoverCams[name];
    this.cams = this.$store.getters.getRoverCams[name];
    //Get Latest pictures available.
    this.loading = true;
    this.$axios
      .get(
        "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
          name +
          "/latest_photos?api_key=" +
          key
      )
      .then(res => {
        this.photos = res.data.latest_photos;
        this.date = res.data.latest_photos[0].earth_date;
        this.max_date = res.data.latest_photos[0].rover.max_date;
        this.min_date = res.data.latest_photos[0].rover.landing_date;
        this.loading = false;
      });
    //Updates manifest if first load.
    if (!this.$store.state.manifest[name]) {
      this.$axios
        .get(
          "https://api.nasa.gov/mars-photos/api/v1/manifests/" +
            name +
            "?api_key=" +
            key
        )
        .then(res => {
          this.manifest = res.data.photo_manifest;
          this.$store.state.manifest[name] = res.data.photo_manifest;
          this.img = this.$store.getters.getRoverImg[name];
        });
    } else {
      this.img = this.$store.getters.getRoverImg[name];
      this.manifest = this.$store.state.manifest[name];
    }
  },
  computed: {
    textSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "display-1 font-weight-bold text-capitalize";
        default:
          return "display-4 font-weight-bold text-capitalize";
      }
    }
  },
  methods: {
    //Get Random date...
    randomDate() {
      const name = this.$route.name,
        max = new Date(this.$store.state.manifest[name].max_date).getTime(),
        min = new Date(this.$store.state.manifest[name].landing_date).getTime();

      const date = new Date(
        Math.floor(Math.random() * (max - min + 1) + min)
      ).toLocaleDateString("fr-CA", { timeZone: "America/New_York" });
      this.date = date;
    },
    //Filters the cameras
    checkType(cam) {
      return this.filters.includes(cam);
    }
  },
  watch: {
    //Updates photos on date change.
    date(val) {
      const key = this.$store.getters.getNasaKey,
        name = this.$route.name;

      this.loading = true;

      this.$axios
        .get(
          "https://api.nasa.gov/mars-photos/api/v1/rovers/" +
            name +
            "/photos?earth_date=" +
            val +
            "&api_key=" +
            key
        )
        .then(res => {
          this.photos = res.data.photos;
          this.loading = false;
        });
    }
  }
};
</script>

<style>
.cards {
  margin: 15px 5px;
}
</style>
