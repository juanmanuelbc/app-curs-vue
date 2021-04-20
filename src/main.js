import { calendariCa } from "./utils/index";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { setupI18n } from "./i18n/i18n";
import { init } from "@/keycloak/index.js";

// Primevue
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";

// Toast
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

// Vuex
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

// Models de Vuex-ORM
import VuexORM from "@vuex-orm/core";
import { Database } from "@vuex-orm/core";

import User from "@/models/User";
import TPost from "@/models/TPost";

import "@/assets/css/Imas.css";

const database = new Database();

database.register(User);
database.register(TPost);

const store = createStore({
  plugins: [VuexORM.install(database), createPersistedState()],
});

const i18n = setupI18n();

const params = {
  init: {
    // Use 'login-required' to always require authentication
    // If using 'login-required', there is no need for the router guards in router.js
    onLoad: "check-sso",
    timeSkew: 50,
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
  },
  config: {
    url: "https://login.imasmallorca.net/auth",
    realm: "imaspro",
    clientId: "apps-imaspro",
  },
};

const defaultParams = {
  config: window.__BASEURL__ ? `${window.__BASEURL__}/config` : "/config",
};
const options = Object.assign({}, defaultParams, params);

init(options.config, options);

export default createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(createPinia())
  .use(PrimeVue, { locale: calendariCa })
  .use(Toast, { hideProgressBar: true })
  .use(ConfirmationService)
  .directive("tooltip", Tooltip)
  .mount("#app");
