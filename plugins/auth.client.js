import Cookie from "js-cookie";
import { unWrap } from "~/utils/fetchUtils";

export default ({ $config, store }, inject) => {
  window.initAuth = init;
  addScript();
  inject("auth", {
    signOut,
  });

  function addScript() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js?onload=initAuth";
    script.async = true;
    document.head.appendChild(script);
  }

  function init() {
    window.gapi.load("auth2", async function() {
      const auth2 = await window.gapi.auth2.init({
        client_id: $config.auth.clientId,
      });

      auth2.currentUser.listen(parseUser);
    });

    window.gapi.signin2.render("googleButton", {
      onsuccess: parseUser, // tell google call parseUser function number
    });
  }

  async function parseUser(user) {
    if (!user.isSignedIn()) {
      Cookie.remove($config.auth.cookieName);
      store.commit("auth/user", null);
      return;
    }

    store.commit("auth/user", {
      fullName: user.name,
      profileUrl: user.image,
    });

    const idToken = user.getAuthResponse().id_token;
    Cookie.set($config.auth.cookieName, idToken, {
      expires: 1 / 24,
      sameSite: "Lax",
    });

    try {
      const response = await unWrap(await fetch("/api/user"));
      const user = response.json;

      store.commit("auth/user", {
        fullName: user.name,
        profileUrl: user.image,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function signOut() {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signOut();
  }
};
