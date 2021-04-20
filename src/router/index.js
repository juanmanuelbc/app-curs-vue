import { createRouter, createWebHistory } from "vue-router";
import { imasKeycloak, hasRole } from "@/keycloak/index.js";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../components/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "postView",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "post-view" */ "@/views/PostView.vue"),
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

router.beforeEach(async (to, from, next) => {
  while (imasKeycloak.ready == false) {
    await sleep(100);
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (imasKeycloak.authenticated) {
      if (!hasRole("rol-portal")) {
        imasKeycloak.ldapError =
          "No tens el rol LDAP assignat; consulta amb informàtica...";
        next({ name: "Login" });
      } else {
        next();
      }
    } else {
      // const loginUrl = app.$keycloak.createLoginUrl();
      // window.location.replace(loginUrl);
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
