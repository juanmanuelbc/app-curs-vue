<template>
  <button class="btn btn-primary ms-2" @click="displayModal = true">
    <i class="fas fa-plus"></i> Afegir post
  </button>

  <Dialog
    header="Nou post"
    v-model:visible="displayModal"
    :style="{ width: '50vw' }"
    :modal="true"
  >
    <div class="mb-3">
      <label for="titol" class="form-label">Títol: *</label>
      <input
        type="text"
        class="form-control"
        id="titol"
        v-model="post.titol"
        placeholder="Títol del post"
      />
    </div>
    <div class="mb-3">
      <label for="categoria" class="form-label">Categoria: *</label>
      <Dropdown
        v-model="post.idCategoria"
        :options="categories"
        optionLabel="nom"
        optionValue="id"
        placeholder="Tria una categoria"
        class="w-100"
      />
    </div>
    <div class="mb-3">
      <label for="imatge" class="form-label">Imatge: *</label>
      <input
        type="text"
        class="form-control"
        id="imatge"
        v-model="post.imatge"
        placeholder="Imatge del post"
      />
    </div>
    <div class="mb-3">
      <label for="descripcio" class="form-label">Descripció: *</label>
      <input
        type="text"
        class="form-control"
        id="descripcio"
        v-model="post.descripcio"
        placeholder="Escriu una petita descripció"
      />
    </div>
    <div class="mb-3">
      <label for="contingut" class="form-label">Contingut: *</label>
      <textarea
        type="text"
        class="form-control"
        id="contingut"
        v-model="post.contingut"
        placeholder="Escriu el contingut del post"
      />
    </div>
    <template #footer>
      <Button
        label="Tancar"
        icon="pi pi-times"
        @click="closeModal"
        class="p-button-secondary"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        @click="savePost"
        :disabled="isDisabled"
      />
    </template>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import { ref, reactive } from "@vue/reactivity";
import axios from "@/axios";
import { computed, onMounted } from "@vue/runtime-core";
import { useToast } from "vue-toastification";
import TPost from "@/models/TPost";

export default {
  components: {
    Dialog,
    Button,
    Dropdown,
  },
  setup() {
    const displayModal = ref(false);
    const categories = ref();
    const toast = useToast();

    // Estat inicial
    const initialState = {
      titol: null,
      imatge: null,
      contingut: null,
      descripcio: null,
      idCategoria: null,
    };

    const post = reactive({ ...initialState });

    onMounted(() => {
      axios
        .get("/static/categories")
        .then(({ data }) => (categories.value = data.categories))
        .catch(() =>
          toast.error("Hi ha hagut un error obtenint les categories...")
        );
    });

    const closeModal = () => {
      displayModal.value = false;
      // Resetejam el form
      Object.assign(post, initialState);
    };

    const isDisabled = computed(() => {
      if (post.titol == null) return true;
      if (post.imatge == null) return true;
      if (post.contingut == null) return true;
      if (post.descripcio == null) return true;
      if (post.idCategoria == null) return true;

      return false;
    });

    const savePost = () => {
      axios
        .post("/post", post)
        .then(({ data }) => {
          TPost.insert({ data: data.post });
          toast.success("S'ha guardat correctament el post!!!");
          closeModal();
        })
        .catch(() => toast.error("Hi ha hagut un error guardant el post..."));
    };

    return { displayModal, closeModal, post, categories, isDisabled, savePost };
  },
};
</script>

<style></style>
