import Keycloak from "keycloak-js";
import { reactive } from "vue";
import axios from "@/axios";

export const imasKeycloak = reactive({
  ready: false,
  authenticated: false,
  userName: null,
  fullName: null,
  token: null,
  tokenParsed: null,
  logoutFn: null,
  loginFn: null,
  login: null,
  createLoginUrl: null,
  createLogoutUrl: null,
  createRegisterUrl: null,
  register: null,
  accountManagement: null,
  createAccountUrl: null,
  loadUserProfile: null,
  loadUserInfo: null,
  subject: null,
  idToken: null,
  idTokenParsed: null,
  realmAccess: null,
  resourceAccess: null,
  refreshToken: null,
  refreshTokenParsed: null,
  timeSkew: null,
  responseMode: null,
  responseType: null,
  hasRealmRole: null,
  hasResourceRole: null,
  keycloak: null,
  ldapError: null,
});

export function init(config, options) {
  const ctor = sanitizeConfig(config);
  const keycloak = Keycloak(ctor);

  keycloak.onReady = function (authenticated) {
    updatekWatchVariables(authenticated);
    imasKeycloak.ready = true;
    typeof options.onReady === "function" && options.onReady(keycloak);
  };
  keycloak.onAuthSuccess = function () {
    // Check token validity every 10 seconds (10 000 ms) and, if necessary, update the token.
    // Refresh token if it's valid for less then 60 seconds
    const updateTokenInterval = setInterval(
      () =>
        keycloak
          .updateToken(60)
          .then(function (refreshed) {
            if (refreshed) {
              updatekWatchVariables(true);
            }
          })
          .catch(() => {
            keycloak.clearToken();
          }),
      10000
    );
    imasKeycloak.logoutFn = () => {
      clearInterval(updateTokenInterval);
      keycloak.logout(
        options.logout || { redirectUri: config["logoutRedirectUri"] }
      );
    };
  };

  keycloak.onAuthRefreshSuccess = function () {
    updatekWatchVariables(true);
  };
  keycloak.onAuthRefreshError = function () {
    updatekWatchVariables(false);
    typeof options.onAuthRefreshError === "function" &&
      options.onAuthRefreshError(keycloak);
  };

  keycloak
    .init(options.init)
    .then((authenticated) => {
      updatekWatchVariables(authenticated);
      typeof options.onInitSuccess === "function" &&
        options.onInitSuccess(authenticated);
    })
    .catch(() => {
      // Keycloak does not return any error message
      updatekWatchVariables(false);
      const error = Error("Could not initialized keycloak-js adapter");
      typeof options.onInitError === "function"
        ? options.onInitError(error)
        : console.error(error);
    });

  function updatekWatchVariables(isAuthenticated = false) {
    imasKeycloak.authenticated = isAuthenticated;
    imasKeycloak.loginFn = keycloak.login;
    imasKeycloak.login = keycloak.login;
    imasKeycloak.createLoginUrl = keycloak.createLoginUrl;
    imasKeycloak.createLogoutUrl = keycloak.createLogoutUrl;
    imasKeycloak.createRegisterUrl = keycloak.createRegisterUrl;
    imasKeycloak.register = keycloak.register;
    imasKeycloak.keycloak = keycloak;
    if (isAuthenticated) {
      imasKeycloak.accountManagement = keycloak.accountManagement;
      imasKeycloak.createAccountUrl = keycloak.createAccountUrl;
      imasKeycloak.hasRealmRole = keycloak.hasRealmRole;
      imasKeycloak.hasResourceRole = keycloak.hasResourceRole;
      imasKeycloak.loadUserProfile = keycloak.loadUserProfile;
      imasKeycloak.loadUserInfo = keycloak.loadUserInfo;
      imasKeycloak.token = keycloak.token;
      imasKeycloak.subject = keycloak.subject;
      imasKeycloak.idToken = keycloak.idToken;
      imasKeycloak.idTokenParsed = keycloak.idTokenParsed;
      imasKeycloak.realmAccess = keycloak.realmAccess;
      imasKeycloak.resourceAccess = keycloak.resourceAccess;
      imasKeycloak.refreshToken = keycloak.refreshToken;
      imasKeycloak.refreshTokenParsed = keycloak.refreshTokenParsed;
      imasKeycloak.timeSkew = keycloak.timeSkew;
      imasKeycloak.responseMode = keycloak.responseMode;
      imasKeycloak.responseType = keycloak.responseType;
      imasKeycloak.tokenParsed = keycloak.tokenParsed;
      imasKeycloak.userName = keycloak?.tokenParsed["preferred_username"];
      imasKeycloak.fullName = keycloak.tokenParsed["name"];

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + keycloak.token;
    }
  }
}

export function hasRole(role) {
  let rols = imasKeycloak.tokenParsed.realm_access.roles;
  return rols.includes(role);
}

function sanitizeConfig(config) {
  const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
    return {
      [newProp]: old,
      ...others,
    };
  };
  return Object.keys(config).reduce(function (previous, key) {
    if (["authRealm", "authUrl", "authClientId"].includes(key)) {
      const cleaned = key.replace("auth", "");
      const newKey = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);
      return renameProp(key, newKey, previous);
    }
    return previous;
  }, config);
}
