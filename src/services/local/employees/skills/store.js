import { URL } from "../../../../utils/constants";




    export const apiStoreEmployeeSkill = async (employeeId, skillId) => {
        console.log(employeeId, skillId)
        const response = await fetch(URL+ `/employee/${employeeId}/skills/${skillId}/store`, {
            method: "POST",
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
                statusCode : response.status
            };
        }
    
        return await response.json();
    
    };
    