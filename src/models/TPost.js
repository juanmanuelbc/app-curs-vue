import { Model } from "@vuex-orm/core";

export default class TPost extends Model {
  static entity = "t_post";

  static fields() {
    return {
      id: this.attr(null),
      titol: this.attr(null),
      imatge: this.attr(null),
      descripcio: this.attr(null),
      contingut: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      idUsuari: this.attr(null),
      deleted_at: this.attr(null),

      // Definim les relacions possibles de la taula:
      usuari: this.attr(null),
      categories: this.attr(null),
      comentaris: this.attr(null),
    };
  }
}
