<template>
  <Menubar :model="items">
    <template #start>
      <img
        src="https://www.imasmallorca.net/sites/all/themes/imas/images/iconos/menu_sup/imas_off.png"
        alt="IMAS Logo"
      />
      <b> IMAS | Blog</b>
    </template>
    <template #end>
      <span style="cursor: pointer" @click="toggle">
        <i class="fas fa-user-circle"></i> {{ me?.nom_complet }}
      </span>
      <Menu id="overlay_menu" ref="menuRef" :model="userItems" :popup="true" />
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import { imasKeycloak } from "@/keycloak/index.js";
import { computed, onMounted, ref } from "vue";
import Menu from "primevue/menu";
import { useToast } from "vue-toastification";
import User from "@/models/User";
// import { useI18n } from "vue-i18n";
import { staticTables } from "@/store/staticTables";
import axios from "@/axios";

export default {
  name: "Navbar",
  components: { Menubar, Menu },
  setup() {
    // const { t } = useI18n();
    const me = computed(() => User.query().first());
    const toast = useToast();
    const pinia = staticTables();
    const menuRef = ref(null);

    const userItems = ref([
      {
        label: () => me.value?.username,
        disabled: true,
      },
      {
        label: "Tanca sessió",
        icon: "fas fa-sign-out-alt",
        command: () => imasKeycloak.logoutFn(),
      },
    ]);

    const items = ref([
      {
        label: "Inici",
        icon: "fas fa-home",
        to: { name: "home" },
      },
    ]);

    const getMe = () => {
      User.deleteAll();
      axios
        .get("/me")
        .then(({ data }) => {
          User.insert({ data: data.user });
          pinia.me = data;
        })
        .catch(() => {
          toast.error("Hi ha hagut un error de xarxa...");
        });
    };

    onMounted(() => {
      getMe();
    });

    const toggle = (event) => {
      menuRef.value.toggle(event);
    };

    return {
      imasKeycloak,
      me,
      userItems,
      items,
      toggle,
      menuRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.p-menubar {
  background-color: #03a9f4;
  border-radius: 0px;
  color: white;

  .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
    padding: 10px;
  }
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  padding: 0.75rem 0.25rem !important;
}
</style>
