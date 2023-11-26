import { URL } from "../../../../utils/constants";

export const apiStoreEmployeeCategory = async (employeeId, categoryId, datePromotion) => {
    console.log(employeeId, categoryId)
    const response = await fetch(URL + `/employees/${employeeId}/categories/${categoryId}/store`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ datePromotion }),
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

};
