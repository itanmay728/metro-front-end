// src/api/AllEmployeeData.js

export async function getAllEmployees() {
  try {
    const data = JSON.parse(localStorage.getItem("auth"));
    const token = data?.token
    console.log(token);

    if (!token) {
      throw new Error("No token found (User not logged in)");
    }

    const response = await fetch("http://localhost:8080/api/admin/allemployees", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Forbidden - You are not ADMIN");
      }
      throw new Error("Request failed with status " + response.status);
    }

    return await response.json();

  } catch (error) {
    console.error("Error loading employee list:", error);
    throw error;
  }
}
