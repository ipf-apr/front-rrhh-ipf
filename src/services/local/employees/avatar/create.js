import { URL } from "../../../../utils/constants";



export const apiStoreEmployeeAvatar = async (employeeId, formData) => {
    const response = await fetch(URL + `/employees/${employeeId}/image`, {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        body: formData,
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
