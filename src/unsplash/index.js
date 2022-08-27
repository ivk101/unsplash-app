import Unsplash from "unsplash-js";

export const unsplash = new Unsplash({
  accessKey: "UNn5owZvWC7Ia3Wq6ucOuhKo-lm9qC_OGaZwbBBmt6g",
  secret: "oirSNKhRzQ36g4X8N-uT0_UynAKtu-T2vw9Leo9tVs0",
  callbackUrl: "http://localhost:3000/auth",
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes",
]);

export const setAccessTokenUnplash = (code) => {
  unsplash.auth
    .userAuthentication(code)
    .then((res) => res.json())
    .then((json) => localStorage.setItem("token", json.access_token));
};
