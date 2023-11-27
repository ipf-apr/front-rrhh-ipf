import { URL } from "../../../utils/constants.js";

export const fetchEmployees = async (formData) => {
  let url = URL + "/employees";

  let searchParams = {};

  if (formData) {
    console.log('formData', formData);
    if (formData.lastName) {
      searchParams.lastName = formData.lastName;
    }
    if (formData.name) {
      searchParams.name = formData.name;
    }
    if (formData.promotion) {
      searchParams.promotion = formData.promotion;
    }
    url = URL + "/employees?" + new URLSearchParams(searchParams);

    console.log(searchParams)
  }

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
