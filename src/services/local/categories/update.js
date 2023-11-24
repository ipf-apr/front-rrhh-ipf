import { URL } from "../../../utils/constants";


export const apiUpdateCategory = async (data) => {
    const response = await fetch(URL + `/categories/${data.id}/update`, {
        method: "PUT",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
          },
        body: JSON.stringify(data),
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
