import { unWrap, getErrorResponse } from "~/utils/fetchUtils";

export default function({ $config }, inject) {
  // const appId = "7OVHMCS6BJ";
  // const apiKey = "364d0203fb2bf42e8f496f6654964a14";

  const appId = $config.algolia.appId;
  const apiKey = $config.algolia.key;

  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };

  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomeByLocation,
    getHomes,
  });

  async function getHome(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          { headers }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [], // removed unused attributes
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [], // removed unused attributes
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomeByLocation(
    lat,
    lng,
    start,
    end,
    radiusInMeters = 1500 * 15
  ) {
    try {
      const days = [];
      for (var day = start; day <= end; day += 86400) {
        days.push(`availability:${day}`);
      }
      return unWrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/query`, {
          headers,
          method: "POST",
          body: JSON.stringify({
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radiusInMeters,
            hitsPerPage: 10,
            filters: days.join(" AND "),
            attributesToHighlight: [],
          }),
        })
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function getHomes() {
    try {
      return unWrap(
        await fetch(
          `https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`,
          {
            headers,
            method: "POST",
            body: JSON.stringify({
              hitsPerPage: 3,
              attributesToHighlight: [],
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }
}
