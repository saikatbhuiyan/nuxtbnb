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
    <img src="/images/marker.svg" width="20" height="20" />{{
      home.location.address
    }}
    {{ home.location.city }} {{ home.location.state }}<br />
    <img src="/images/star.svg" width="20" height="20" />
    {{ home.reviewValue }} <br />
    {{ home.guests }} guests, {{ home.pricePerNight }} /
    {{ home.bedrooms }} rooms, {{ home.beds }} beds,
    {{ home.bathrooms }} bath<br />
    {{ home.description }}
    <div style="height: 800px; width: 800px" ref="map"></div>
    <div v-for="review in reviews" :key="review.objectId">
        <img :src="review.reviewer.image" /><br/>
        {{ review.reviewer.name }}<br/>
        {{ formatDate(review.date) }}<br/>
        <short-text :text="review.comment" :target="150" /><br/>
    </div>
  </div>
</template>

<script>
import ShortText from '../../components/ShortText.vue';
export default {
  components: { ShortText },
  head() {
    return {
      title: this.home.title,
    };
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    );
  },
  // `asyncData` is Nuxt feature for async Data, it's come with so many things
  async asyncData({ params, $dataApi, error }) {
    const homeResponse = await $dataApi.getHome(params.id);
    if (!homeResponse.ok)
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      });

    const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
    if (!reviewResponse.ok)
      return error({
        statusCode: reviewResponse.status,
        message: reviewResponse.statusText,
      });

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
    };
  },
  methods:{
      formatDate(dateStr){
          const date = new Date(dateStr)
          return date.toLocaleDateString(undefined, {month: 'long', year: 'numeric', day: '2-digit'})
      }
  }
};
</script>