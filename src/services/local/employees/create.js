import { URL } from "../../../utils/constants";


export const apiStoreEmployee = async (data) => {
    const response = await fetch(URL + "/employees", {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
           ...data,
            dateBirthday: data.fechaNac,            
            profileNro: data.nroLegajo,
            dateIn: data.ingreso
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
