const dtBase = (order) => {
  // @ts-ignore
  window.jQuery(document).ready(function () {
    // @ts-ignore
    window.jQuery("table").DataTable({
      language: {
        processing: "Processant...",
        lengthMenu: "Mostra _MENU_ registres",
        zeroRecords: "No s'han trobat registres",
        emptyTable: "No hi ha registres disponible en aquesta taula",
        info: "Mostrant del _START_ al _END_ d'un total de _TOTAL_ registres",
        infoEmpty: "No hi ha registres disponibles",
        infoFiltered: "(filtrat de _MAX_ registres)",
        search: "Cerca:",
        infoThousands: ".",
        decimal: ",",
        loadingRecords: "Carregant...",
        paginate: {
          first: "Primer",
          previous: "Anterior",
          next: "Següent",
          last: "Últim",
        },
        aria: {
          sortAscending: ": Activa per ordenar la columna de manera ascendent",
          sortDescending:
            ": Activa per ordenar la columna de manera descendent",
        },
        buttons: {
          print: "Imprimeix llistat",
          copy: "Copia",
          colvis: "Columnes",
          copyTitle: "Copia al portapapers",
          copySuccess: {
            _: "%d files copiades",
            1: "1 fila copiada",
          },
          pageLength: {
            "-1": "Mostra totes les files",
            _: "Mostra %d files",
          },
        },
        select: {
          rows: {
            _: "%d files seleccionades",
            0: "Cap fila seleccionada",
            1: "1 fila seleccionada",
          },
        },
      },
      dom: "Bfrtip",
      paging: false,
      order: order,
      buttons: [
        "copyHtml5",
        {
          extend: "excelHtml5",
          autoFilter: true,
        },
        {
          extend: "print",
          exportOptions: {
            stripHtml: false,
          },
        },
      ],
    });
  });
};

const llistat1 = () => {
  dtBase([[5, "asc"]]);
};

const llistat2 = () => {
  dtBase([[1, "asc"]]);
};

const llistat3 = () => {
  dtBase([[0, "asc"]]);
};

const llistat4 = () => {
  dtBase([[1, "asc"]]);
};

const llistat9 = () => {
  dtBase([[1, "asc"]]);
};

const llistat10 = () => {
  dtBase([[1, "asc"]]);
};

const llistat11 = () => {
  dtBase([[1, "asc"]]);
};

const llistat14 = () => {
  dtBase([[1, "asc"]]);
};

const llistat15 = () => {
  dtBase([[1, "asc"]]);
};

const llistat17 = () => {
  dtBase([[1, "asc"]]);
};

const llistat5 = () => {
  dtBase([[1, "asc"]]);
};
const llistat6 = () => {
  dtBase([[0, "asc"]]);
};
const llistat7 = () => {
  dtBase([[1, "asc"]]);
};
const llistat8 = () => {
  dtBase([[1, "asc"]]);
};
const llistat12 = () => {
  dtBase([[1, "asc"]]);
};
const llistat13 = () => {
  dtBase([[0, "asc"]]);
};
const llistat16 = () => {
  dtBase([[1, "asc"]]);
};

export const aplicaLlistats = (idLlistat) => {
  switch (idLlistat) {
    case 1:
      llistat1();
      break;
    case 2:
      llistat2();
      break;

    case 3:
      llistat3();
      break;

    case 4:
      llistat4();
      break;

    case 5:
      llistat5();
      break;

    case 6:
      llistat6();
      break;

    case 7:
      llistat7();
      break;

    case 8:
      llistat8();
      break;

    case 9:
      llistat9();
      break;

    case 10:
      llistat10();
      break;

    case 11:
      llistat11();
      break;

    case 12:
      llistat12();
      break;

    case 13:
      llistat13();
      break;

    case 14:
      llistat14();
      break;
    case 15:
      llistat15();
      break;

    case 16:
      llistat16();
      break;
    case 17:
      llistat17();
      break;

    default:
      break;
  }
};
