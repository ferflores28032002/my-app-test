import { ApiResponse } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

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
