import { URL } from "../../../utils/constants";


export const apiStoreEmployee = async ({
    lastName,
    name,
    dni,
    domicilio,
    fechaNac,
    phone,
    nroLegajo,
    ingreso
}) => {
    const response = await fetch(URL + "/employees", {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            lastName,
            name,
            dni,
            domicilio,
            dateBirthday: fechaNac,
            phone,
            profileNro: nroLegajo,
            dateIn: ingreso
        }),
    });

    if (!response.ok) {
        const resp = await response.json();
        console.log(resp)
        throw {
            errors: resp.errors || resp.message,
            statusCode : response.status
        };
    }

    return await response.json();

};
