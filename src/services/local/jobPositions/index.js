import { URL } from "../../../utils/constants.js";


export const fetchJobPositions = async (formData) => {
  let url = URL + "/jobPositions";

  const searchParams = {
    position: formData?.position ?? '%'
  };

  if (formData) {
    url = URL + "/jobPositions?" + new URLSearchParams(searchParams);
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