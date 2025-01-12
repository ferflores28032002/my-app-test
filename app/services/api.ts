import { ApiResponse } from "../types";

export const API_URL = "https://hiresprintcanvas.dreamhosters.com";
export const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieGFkQnVpbGRlciIsImlhdCI6MTczNjY5NDcyMywiZXhwIjoxNzM2NzIzNTIzfQ.cZOL9B5rhdlxV4E7ijecwUoTrUblLQ1Sx3V6-VOPPDI";

export async function fetchProducts(): Promise<ApiResponse> {
  try {
    const response = await fetch(`${API_URL}/getProducts`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.result) {
      throw new Error("Invalid data format received from API");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
