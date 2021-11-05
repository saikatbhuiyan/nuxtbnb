<template>
    <div>
        <div v-if="homes.length > 0">
            <HomeRow v-for="home in homes" :key="home.objectID" :home="home"/>
        </div>
        <div v-else>No results found</div>
    </div>
</template>

<script>
export default {
    head(){
        return `Homes arround ${this.label}`
    },
    // watchQuery: ['lat'], //watchQuery is nuxt feature refresh data when 'lat' change
    async beforeRouteUpdate (to, from, next) {
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