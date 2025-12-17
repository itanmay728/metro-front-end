import setEmployeeProfile from "../contextAPI/slices/authSlice";



const authFunction = async (formData) => {
  try {
    const res = await fetch("http://localhost:8080/api/public/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Invalid email or password");
      return;
    }

    const data = await res.json();
    // console.log(data);


    return data;
  } catch (err) {
    console.error("Login error:", err);
  }
};

export default authFunction;

