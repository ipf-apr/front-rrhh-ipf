import { URL } from "../../../utils/constants.js";

export const  fetchEmployees = async (formData) => {


    let url = URL + '/employees';
  
    const searchParams = {
      lastName: formData?.lastName ?? '',
      name: formData?.name ?? '',
      promotion: formData?.promotion ?? ''
    };
  
    if (formData) {
      url = URL+"/employees?" + new URLSearchParams(searchParams);
    }
  
  
    const response = await fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
        Accept: 'application/json'
      },
    });
  
    if (response.status === 404) {
      return [];
    }

    if (response.status === 403) {
      return [];
    }
  
    const data = await response.json();
  
    return data;
  };