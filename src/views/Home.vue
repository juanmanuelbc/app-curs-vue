<template>
  <div class="home">
    <div class="mb-5 mt-4">
      <h1>Llista de publicacions</h1>
    </div>
    <div class="container">
      <DataTable class="p-datatable-gridlines" :value="posts">
        <template #header>
          <div style="text-align: right">
            <span class="p-input-icon-left ms-2">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Cercar"
                size="40"
              />
              <AfegirPost></AfegirPost>
            </span>
          </div>
        </template>
        <Column field="titol" header="Titol"></Column>
        <Column field="usuari.username" header="Autor"></Column>
        <Column header="Categories">
          <template #body="{ data }">
            <span
              class="badge bg-info text-dark me-2"
              v-for="categoria in data.categories"
              :key="categoria.id"
              >{{ categoria.nom }}</span
            >
          </template>
        </Column>
        <Column field="created_at" header="Data">
          <template #body="{ data }">
            {{ formatDate(data.created_at) }}
          </template>
        </Column>
        <Column header="Accions">
          <template #body="{ data }">
            <router-link
              :to="{ name: 'postView', params: { id: data.id } }"
              class="btn btn-primary"
              v-tooltip="'Veure el post'"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <EditarPost :poste="data"></EditarPost>
            <button
              type="button"
              class="btn btn-danger ms-2"
              v-tooltip="'Eliminar el post'"
              @click="deletePost(data.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </template>
        </Column>
        <template #empty>
          <div class="alert text-center alert-primary" role="alert">
            No hi ha posts a mostrar
          </div>
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";
import TPost from "@/models/TPost";
import { computed, onMounted, reactive } from "@vue/runtime-core";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import { FilterMatchMode } from "primevue/api";
import { formatDate } from "@/utils";
import { useToast } from "vue-toastification";

import AfegirPost from "@/components/home/AfegirPost";
import EditarPost from "@/components/home/EditarPost";

export default {
  name: "Home",
  components: {
    DataTable,
    Column,
    InputText,
    AfegirPost,
    EditarPost,
  },
  setup() {
    const posts = computed(() => TPost.all());
    const toast = useToast();
    const filters = reactive({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const alerta = (msg) => {
      toast.warning(msg, { timeout: false });
    };

    onMounted(() => {
      axios.get("/post").then(({ data }) => {
        TPost.insert({ data: data.posts });
      });
    });

    const deletePost = (id) => {
      /**
       * Aquesta idea de programació és la que vos volia posar a un capítol de tècniques de millora de rendiment.
       * El que feim aquí és, directament, eliminar primer la nostra store i després eliminam al backend.
       * Fent això guanyam rapidesa (la tasca d'esperar a que el backend ens comuniqui si s'ha eliminat és transparent a l'usuari).
       * Però què passa si al backend hi ha un error? Hauriem provocat una inconsistència de dades (les dades del navegador no serien les mateixes que al backend)
       * Per tant, el que feim al punt [1] és fer una còpia de l'element a eliminar i ho guardam en memòria.
       * Seguidament l'eliminam de la nostra store, aquí l'usuari ja veu que s'elimina, totalment instantàni, sense esperar.
       * Després, l'eliminam al backend, si funciona bé, no tocam res, ja que el post ja el tenim eliminat.
       * Però si ha anat malament, el que feim és restaurar el post amb les dades que prèviament haviem eliminat i teniem en memòria.
       *
       * Una manera de provar l'efectivitat d'això és, abans de pitjar al botó d'eliminar, tancau el procés de Artisan (així provocareu un error de xarxa),
       * i veureu que l'element s'elimina un instant, i quan bota l'error, es torna regenerar.
       *
       * És una tècnica totalment opcional, pot ser esteis fent feina amb estructures de dades més complexes i és complicat regenerar-les correctament, però per a
       * estructures senzilles, és una tècnica atractiva per millorar la velocitat d'interacció (l'usuari creu que és instantani).
       *
       */
      let post = TPost.find(id).$toJson();
      TPost.delete(id);
      axios
        .delete(`/post/${id}`)
        .then(() => {
          toast.success("S'ha eliminat el post correctament...");
        })
        .catch(() => {
          TPost.insert({ data: post });
          toast.error("Hi ha hagut un error eliminant l'element...");
        });
    };

    return { posts, filters, formatDate, deletePost, alerta };
  },
};
</script>
