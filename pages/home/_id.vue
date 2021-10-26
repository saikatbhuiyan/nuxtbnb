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
    {{ home.description }}
    <div style="height:800px;width:800px" ref="map"></div>
  </div>
</template>

<script>
export default {
    head() {
        return {
            title: this.home.title
        }
    },
    mounted() {
      this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
    },
    // `asyncData` is Nuxt feature for async Data
    asyncData({ params, $dataApi }) {
      const home = await $$dataApi.getHome(params.id)
      return {
        home,
      }
    },
};
</script>