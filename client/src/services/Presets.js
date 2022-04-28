import http from "../http-common";

export default {
  getCharacterPresets: () => {
    return http.get("/user/characterPresets")
      .then(response => response.data.characterPresets)
      .catch(response => response.data);
  },
  getGamePresets: () => {
    return http.get("/user/gamePresets")
      .then(response => response.data.gamePresets)
      .catch(response => response.data);
  },
  addCharacterPreset: (name, characterData) => {
    return http.post("/user/characterPreset", {name, characterData})
      .then(response => response.data)
      .catch(response => response.data);
  }
}