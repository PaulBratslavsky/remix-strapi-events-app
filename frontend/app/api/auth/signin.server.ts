import { createUserSession } from "~/lib/session.server";

export async function signin(data: any) {
  const baseUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
  const path = `/api/auth/local`;

  const request = await fetch(baseUrl + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const response = await request.json();
  
  if (response.error) return { error: response.error };

  return await createUserSession("/dashboard", {
    user: response.user,
    jwt: response.jwt,
  });
}
