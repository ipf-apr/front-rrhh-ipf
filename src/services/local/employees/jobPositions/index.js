import { URL } from "../../../../utils/constants";

export const fetchEmployeeJobPositions= async (employeeId) => {
    const response = await fetch(
        `${URL}/employees/${employeeId}/jobPositions`, {
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
