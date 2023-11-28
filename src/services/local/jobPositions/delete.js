import { URL } from "../../../utils/constants";

export const apiDeleteJobPosition = async (jobPositionId) => {
    const response = await fetch(URL + `/jobPositions/${jobPositionId}/destroy`, {
        method: 'DELETE',
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        },

    });

    if (!response.ok) {
        const resp = await response.json();
        console.log(resp)
        throw {
            errors: resp.errors || resp.message,
            statusCode: response.status
        };
    }

    return await response.json();
}