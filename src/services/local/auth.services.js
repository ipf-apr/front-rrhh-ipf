import { URL } from "../../utils/constants.js";

export const login = async ({ username, password }) => {
  console.log(URL);
  const response = await fetch(URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  
  if (!response.ok) {
    const resp = await response.json();
    console.log(resp)
    throw {
      errors: resp.errors || resp.message,
    };
  }
  const { message, token } = await response.json();


  return { message, token };
};
