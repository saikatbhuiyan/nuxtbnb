<template>
  <div class="app-container">
    <property-gallery :images="home.images" />
    <property-details :home="home" />
    <property-description :home="home" />
    <property-map :home="home" />
    <property-reviews :reviews="reviews" />
    <property-host :user="user" />
  </div>
</template>

<script>
import ShortText from "../../components/ShortText.vue";
import PropertyReviews from "../../components/PropertyReviews.vue";

export default {
  components: { ShortText, PropertyReviews },
  head() {
    return {
      title: this.home.title,
    };
  },
  // `asyncData` is Nuxt feature for async Data, it's come with so many things
  async asyncData({ params, $dataApi, error }) {
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ]);

    const badResponse = responses.find((response) => !response.ok);
    if (badResponse)
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      });

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0],
    };

    // const homeResponse = await $dataApi.getHome(params.id);
    // if (!homeResponse.ok)
    //   return error({
    //     statusCode: homeResponse.status,
    //     message: homeResponse.statusText,
    //   });
    // if (!homeResponse.ok)
    //   return error({
    //     statusCode: homeResponse.status,
    //     message: homeResponse.statusText,
    //   });

    // const reviewResponse = await $dataApi.getReviewsByHomeId(params.id);
    // if (!reviewResponse.ok)
    //   return error({
    //     statusCode: reviewResponse.status,
    //     message: reviewResponse.statusText,
    //   });

    // const userResponse = await $dataApi.getUserByHomeId(params.id);
    // if (!userResponse.ok)
    //   return error({
    //     statusCode: userResponse.status,
    //     message: userResponse.statusText,
    //   });

    // return {
    //   home: homeResponse.json,
    //   reviews: reviewResponse.json.hits,
    //   user: userResponse.json.hits[0],
    // };
  },
};
</script>