export default  function(context, inject) {
    const appId = '7OVHMCS6BJ'
    const apiKey = '364d0203fb2bf42e8f496f6654964a14'

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId,
            }
        })
        const json = await response.json()
        return json
    }
}