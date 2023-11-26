import { URL } from "../../../utils/constants.js";


export const fetchSkills = async (formData) => {
  let url = URL + "/skills";

  const searchParams = {
    position: formData?.position ?? '%'
  };

  if (formData) {
    url = URL + "/skills?" + new URLSearchParams(searchParams);
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