<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :src="image"
        :key="image"
        width="250px"
        height="150px"
      />
    </div>
    {{ home.title }} <br />
    <img src="/images/marker.svg" width="20" height="20">{{ home.location.address }} {{ home.location.city }} {{ home.location.state}}<br />
    <img src="/images/star.svg" width="20" height="20">   {{ home.reviewValue }} <br/>
    {{ home.guests }} guests, {{ home.pricePerNight }} /  {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br />
  </div>
</template>

<script>
import homes from "~/data/homes";

export default {
    head() {
        return {
            title: this.home.title
        }
    },
    data() {
        return {
        home: {},
        };
    },
    created() {
        const home = homes.find((home) => home.objectID == this.$route.params.id);
        this.home = home;
    },
};
</script>