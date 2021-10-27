export default function(context, inject) {
  const appId = "7OVHMCS6BJ";
  const apiKey = "364d0203fb2bf42e8f496f6654964a14";
  const headers = {
    "X-Algolia-API-Key": apiKey,
    "X-Algolia-Application-Id": appId,
  };
  inject("dataApi", {
    getHome,
    getReviewsByHomeId,
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
            }),
          }
        )
      );
    } catch (error) {
      return getErrorResponse(error);
    }
  }

  async function unWrap(response) {
    const json = await response.json();
    const { ok, status, statusText } = response;
    return {
      json,
      ok,
      status,
      statusText,
    };
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    };
  }
}
