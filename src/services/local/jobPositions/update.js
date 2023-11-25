import { URL } from "../../../utils/constants";


export const apiUpdateJobPosition = async (data) => {
    const response = await fetch(URL + `/jobPositions/${data.id}/update`, {
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
        throw {
            errors: resp.errors || resp.message,
            statusCode : response.status
        };
    }

    return await response.json();

};
