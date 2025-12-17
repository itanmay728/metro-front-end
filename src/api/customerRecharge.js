export async function rechargeCard(cardId, amount) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (!auth?.token) {
    throw new Error("User not logged in");
  }

  const response = await fetch(
    "http://localhost:8080/api/customer/recharge",
    {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${auth.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardId: cardId,
        newBalance: Number(amount), // recharge amount
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Recharge failed");
  }

  return response.text(); // "Recharge successful"
}
