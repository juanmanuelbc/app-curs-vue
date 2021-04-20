import { Model } from "@vuex-orm/core";

export default class User extends Model {
  static entity = "t_usuari";

  static fields() {
    return {
      id: this.attr(null),
      nom: this.attr(null),
      llinatges: this.attr(null),
      username: this.attr(null),
      created_at: this.attr(null),
      updated_at: this.attr(null),
      deleted_at: this.attr(null),
      dni: this.attr(null),
      email: this.attr(null),
      telefon: this.attr(null),
    };
  }

  get nom_complet() {
    return `${this.nom} ${this.llinatges}`;
  }
}
