
import { URL } from "../../../utils/constants.js";


export const fetchEmployeeCategories = async (employeeId) => {
    const response = await fetch(
        `${URL}/employees/${employeeId}/categories`, {
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
        },
    }
    );
    // Si hubo un error al obtener los datos de un usuario
    if (!response.ok) {
        const errors = await response.json();
        throw errors;
    }
    // Se obtienen los datos de la respuesta (fetch)
    const data =  await response.json();
    return data;
};
