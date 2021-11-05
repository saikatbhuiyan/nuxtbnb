<template>
    <div>
        {{ lat }} / {{ lng }} /{{ label }} <br/>
        <div v-for="home in homes" :key="home.objectID"><br/></div>
    </div>
</template>

<script>
export default {
    // watchQuery: ['lat'], //watchQuery is nuxt feature refresh data when 'lat' change
    beforeRouteUpdate (to, from, next) {
        const data = await this.$dataApi.getHomeByLocation(to.query.lat, to.query.lng)
        this.homes = data.json.hits
        this.label = to.query.label
        this.lat = to.query.lat
        this.lng = to.query.lng
        next()
    },
    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomeByLocation(query.lat, query.lng)
        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    },
}
</script>