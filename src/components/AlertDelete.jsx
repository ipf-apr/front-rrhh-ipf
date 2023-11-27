import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const AlertDelete = async (handleConfirm) => {
  return withReactContent(Swal)
    .fire({
      title: "Estás seguro?",
      text: "Esta acción no se podrá revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        handleConfirm();
        Swal.fire({
          title: "Eliminado!",
          text: "El registro fue eliminado correctamente.",
          icon: "success",
        });
      }
    });
};
