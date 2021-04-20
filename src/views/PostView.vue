<template>
  <div class="container-fluid mt-3">
    <div class="card">
      <div class="card-body">
        <Breadcrumb :home="home" :model="items" />
      </div>
    </div>
    <div class="card mt-3 text-start">
      <div class="card-header"><strong>Informació</strong></div>
      <div class="card-body">
        <ul>
          <li>
            Títol: <em>{{ post.titol }}</em>
          </li>
          <li>Imatge: <img :src="post.imatge" /></li>
          <li>
            Descripció: <em>{{ post.descripcio }}</em>
          </li>
          <li>
            Contingut: <em>{{ post.contingut }}</em>
          </li>
          <li>
            Autor: <em>{{ post.usuari.username }}</em>
          </li>
          <li>
            Data de creació: <em>{{ formatDate(post.created_at) }}</em>
          </li>
        </ul>
      </div>
    </div>
    <div class="card mt-3 text-start">
      <div class="card-header"><strong>Categories</strong></div>
      <div class="card-body">
        <ul>
          <li v-for="categoria in post.categories" :key="categoria.id">
            {{ categoria.nom }}
          </li>
        </ul>
      </div>
    </div>
    <div class="card mt-3 text-start">
      <div class="card-header"><strong>Comentaris</strong></div>
      <div class="card-body">
        <ul>
          <li v-for="comentari in post.comentaris" :key="comentari.id">
            {{ comentari.text }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TPost from "@/models/TPost";
import { computed } from "@vue/runtime-core";
import Breadcrumb from "primevue/breadcrumb";
import { useRoute } from "vue-router";
import { formatDate } from "@/utils";

export default {
  name: "Visor de post",
  components: {
    Breadcrumb,
  },
  setup() {
    const route = useRoute();
    const post = computed(() => TPost.find(route.params.id));
    const home = { icon: "pi pi-home", to: { name: "home" } };
    const items = [{ label: "Visor de post" }];

    return { post, home, items, formatDate };
  },
};
</script>

<style></style>
