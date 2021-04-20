import { defineStore } from "pinia";

export const staticTables = defineStore({
  // name of the store
  // it is used in devtools and allows restoring state
  id: "static",
  // a function that returns a fresh state
  state: () => ({
    vincles: [],
    grausDependencia: [],
    estatsCivils: [],
    motiusBaixa: [],
    tipusMoviments: [],
    solicitudTipusSeguiments: [],
    escalesPAI: [],
    tipusSeguimentsPAI: [],
    solicitudTipus: [],
    me: {},
    env: [],
  }),
  // optional actions
  actions: {
    reset() {
      this.vincles = [];
    },
  },
});
