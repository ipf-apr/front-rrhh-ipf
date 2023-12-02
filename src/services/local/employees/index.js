import { URL } from "../../../utils/constants.js";

export const fetchEmployees = async (params) => {
  
  const url = URL + `/employees?${params?.toString()}`;

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
