import { URL } from "../../../../utils/constants.js";



export const fetchEmployeeSkills = async (employeeId) => {

    const response = await fetch(
        `${URL}/employee/${employeeId}/skills`,
        {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        }
    );
    if (response.status === 404) {
        return [];
    }

    const data = response.json();

    return data;
};