import axios from "axios";

const API_KEY = "72njgfa948d9aS7gs5";
const BASE_URL = "https://stageapi.monkcommerce.app/task/products/search";

export const fetchProducts = async (search = "", page = "", limit = "") => {
  try {
    // Check if any parameters are provided
    const hasParams = search || page || limit;

    const response = await axios.get(BASE_URL, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json", // Optional, add if required
      },
      ...(hasParams && {
        params: {
          ...(search && { search }),
          ...(page && { page }),
          ...(limit && { limit }),
        },
      }),
    });

    console.log("API Response:", response.data); // Log data for debugging
    return response.data; // Return the API response data
  } catch (error) {
    if (error.response) {
      // API responded with a status code outside of the range of 2xx
      console.error(
        `API error: ${error.response.status} ${error.response.statusText}`,
        error.response.data
      );
      if (error.response.status === 403) {
        console.error("403 Forbidden: Check API key or permissions.");
      }
    } else if (error.request) {
      // No response received from the API
      console.error("No response from API:", error.request);
    } else {
      // Other errors during setup
      console.error("Error setting up API request:", error.message);
    }
    throw error;
  }
};
