import { URL } from "../../../../utils/constants";

export const apiStoreEmployeeJobPosition = async (employeeId, jobPositionId) => {
    const response = await fetch(URL + `/employees/${employeeId}/jobPositions/${jobPositionId}/store`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        const resp = await response.json();
        throw {
            errors: resp.errors || resp.message,
            statusCode: response.status
        };
    }

    return await response.json();

};
