import User from "@/models/User";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

export const stringToDate = (stringDate) => {
  if (!stringDate) return null;
  dayjs.extend(customParseFormat);
  return dayjs(stringDate, "DD/MM/YYYY").toDate();
};

export const printConceptes = (conceptes, type) => {
  const arr = [];
  if (!conceptes) return "";

  conceptes.forEach((element) => {
    if (element.tipus == type) {
      const str = element.descripcio + "(" + element.import + ")";
      arr.push(str);
    }
  });

  return arr.join(", ");
};

export const formatDate = (date) => {
  if (date == null) return null;
  dayjs.extend(customParseFormat);
  return dayjs(date).format("DD/MM/YYYY");
};

export const formatFullDate = (date) => {
  if (date == null) return null;
  dayjs.extend(customParseFormat);
  return dayjs(date).format("DD/MM/YYYY HH:mm:ss");
};

export const validDni = (value) => {
  if (value == null) return false;
  const validChars = "TRWAGMYFPDXBNJZSQVHLCKET";
  const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  const nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  const str = value.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

  const nie = str
    .replace(/^[X]/, "0")
    .replace(/^[Y]/, "1")
    .replace(/^[Z]/, "2");

  const letter = str.substr(-1);
  const charIndex = parseInt(nie.substr(0, 8)) % 23;

  if (validChars.charAt(charIndex) === letter) return true;

  return false;
};

export const isValidDate = (dateString) => {
  dayjs.extend(customParseFormat);
  return dayjs(dateString, "DD/MM/YYYY", true).isValid();
};

export const minLength = (value, min) => {
  const str = String(value);
  return str.length >= min;
};

export const minLengthRequired = (value, min) => {
  if (value == null) return false;
  const str = String(value);
  return str.length >= min;
};

export const age = (dob) => {
  if (dob) {
    dayjs.extend(customParseFormat);
    const age = dayjs().diff(dayjs(dob, "DD/MM/YYYY", true), "year");
    if (Number.isInteger(age)) return age;
  }
  return null;
};

export const truncateText = (text, MAX_LEN = 100) => {
  if (text.length >= MAX_LEN) {
    return text.substring(0, MAX_LEN) + "...";
  }
  return text;
};

export const isInRoles = (rolName) => {
  const me = User.query().first();
  const perfils = me?.usuari_perfils;
  const rols_globals = me?.rols_globals;
  const rolsServei = [];

  if (rols_globals) {
    for (const rol of rols_globals) {
      if (rol.codi == "administrador" || rol.codi == "superadmin") {
        return true;
      }
    }
  }

  const pr = perfils?.filter((e) => e.idServei == me?.idServeiActual);
  pr?.forEach((e) => {
    e.usuari_perfil_rols.forEach((element) => {
      rolsServei.push(element.rol.codi);
    });
  });

  let ret = false;

  const arr = rolName.split(",");

  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (rolsServei.includes(element)) {
      ret = true;
    }
  }

  return ret;
};

export const formatCalendariSAID = (diesActuacions) => {
  const days = [];

  for (let i = 0; i < diesActuacions.length; i++) {
    const c = diesActuacions.charAt(i);
    if (c == "1") {
      switch (i) {
        case 0:
          days.push("Dilluns");
          break;
        case 1:
          days.push("Dimarts");
          break;
        case 2:
          days.push("Dimecres");
          break;
        case 3:
          days.push("Dijous");
          break;
        case 4:
          days.push("Divendres");
          break;
      }
    }
  }

  return days.join(", ");
};

export const calendariEs = {
  choose: "Tria",
  firstDayOfWeek: 1,
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  today: "Hoy",
  clear: "Borrar",
  weekHeader: "Sm",
};

export const calendariCa = {
  firstDayOfWeek: 1,
  dayNames: [
    "Diumenge",
    "Dilluns",
    "Dimarts",
    "Dimecres",
    "Dijous",
    "Divendres",
    "Dissabte",
  ],
  dayNamesShort: ["Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"],
  dayNamesMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds"],
  monthNames: [
    "Gener",
    "Febrer",
    "Març",
    "Abril",
    "Maig",
    "Juny",
    "Juliol",
    "Agost",
    "Setembre",
    "Octubre",
    "Novembre",
    "Decembre",
  ],
  monthNamesShort: [
    "Gen",
    "Feb",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Oct",
    "Nov",
    "Dec",
  ],
  today: "Avui",
  clear: "Borrar",
  weekHeader: "Sm",

  startsWith: "Comença per",
  contains: "Conté",
  notContains: "No conté",
  endsWith: "Acaba per",
  equals: "Igual",
  notEquals: "No igual",
  noFilter: "Sense filtre",
  lt: "Menor que",
  lte: "Menor que o igual a",
  gt: "Major que",
  gte: "Major que o igual a",
  dateIs: "La data és",
  dateIsNot: "La data no és",
  dateBefore: "La data és anterior",
  dateAfter: "La data és després",
  apply: "Aplicar",
  matchAll: "Match All",
  matchAny: "Match Any",
  addRule: "Afegir regla",
  removeRule: "Eliminar regla",
  accept: "Sí",
  reject: "No",
  choose: "Choose",
  upload: "Pujar",
  cancel: "Cancelar",
  dateFormat: "dd/mm/yy",
  weak: "Weak",
  medium: "Medium",
  strong: "Strong",
  passwordPrompt: "Introdueix una contrasenya",
  emptyFilterMessage: "No s'han trobat resultats",
  emptyMessage: "No hi ha opcions disponibles",
};
