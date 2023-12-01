import { URL } from "../../../utils/constants.js";

export const fetchEmployees = async (formData) => {
  let url = URL + "/employees";

  let searchParams = {};

  if (formData) {
    if (formData.lastName) {
      searchParams.lastName = formData.lastName;
    }
    if (formData.name) {
      searchParams.name = formData.name;
    }
    if (formData.promotion) {
      searchParams.promotion = formData.promotion;
    }
    if (formData.selectedJobPosition) {
      searchParams.position = formData.selectedJobPosition;
    }
    if (formData.selectedCategory) {
      searchParams.category = formData.selectedCategory;
    }
    if (formData.selectedSkill) {
      searchParams.skill = formData.selectedSkill;
    }
    if (formData.gender) {
      searchParams.gender = formData.gender;
    }
    url = URL + "/employees?" + new URLSearchParams(searchParams);
    
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
