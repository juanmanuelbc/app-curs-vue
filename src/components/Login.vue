<template>
  <div class="loginBase" v-if="imasKeycloak.ready">
    <div class="container full-height">
      <div class="row full-height justify-content-center align-items-center">
        <div class="col-md-8">
          <img
            src="@/assets/img/Logo_IMAS_blanc.png"
            class="mx-auto d-block"
            alt="logo_IMAS"
            style="margin-bottom: 40px; width: 50%"
          />
          <div class="card">
            <div class="card-header">Blog Login</div>

            <div class="card-body p-4">
              <div class="d-flex justify-content-center">
                <button @click="doLogin" class="btn btn-primary">
                  Entrar al Blog
                </button>
              </div>
              <template v-if="ldapError">
                <div class="alert alert-warning mt-3" role="alert">
                  {{ ldapError }}
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, watch } from "vue";
import { imasKeycloak } from "@/keycloak/index.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    onMounted(() => {
      if (imasKeycloak.authenticated) {
        router.push({ name: "home" });
      }
    });

    const ldapError = computed(() => imasKeycloak.ldapError);

    watch(
      () => imasKeycloak.ready,
      (ready) => {
        if (ready == true && imasKeycloak.authenticated) {
          router.push({ name: "home" });
        }
      }
    );

    function doLogin() {
      const loginUrl = imasKeycloak.createLoginUrl();
      window.location.replace(loginUrl);
    }

    return { doLogin, ldapError, imasKeycloak };
  },
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  height: 100%;
}

.loginBase {
  background-color: #0288d1;
  height: 100%;
}
</style>
