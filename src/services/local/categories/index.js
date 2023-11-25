
import { URL } from "../../../utils/constants.js";


export const fetchCategories = async (formData) => {
    const searchParams = {
        name: formData?.name ?? "",
    };

    const response = await fetch(
        `${URL}/categories?` + new URLSearchParams(searchParams),
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