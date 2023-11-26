import { URL } from "../../../utils/constants.js";


export const fetchUsers = async (formData) => {

    const url = URL + "/users";

    //TODO: add user search

    const response = await fetch(url, {
        headers: {
            Authorization: localStorage.getItem("token"),
            Accept: "application/json",
        },
    });

    if (!response.ok) {
        const errors = await response.json();

        throw errors;
    }

    const data = await response.json();

    return data;
};