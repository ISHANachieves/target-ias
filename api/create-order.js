module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return res.status(503).json({
      error: "Razorpay keys are not configured yet in Vercel Environment Variables (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET)."
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const coupon = (body.coupon || "").trim().toUpperCase();
    const email = (body.email || "").trim();

    // Server-side pricing to prevent client-side price tampering
    let amountInRupees = 1499;
    if (coupon === "TARGET20") {
      amountInRupees = 1199;
    }

    const authHeader = "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader
      },
      body: JSON.stringify({
        amount: amountInRupees * 100, // paise
        currency: "INR",
        receipt: "tias_" + Date.now(),
        notes: {
          brand: "TARGET-IAS",
          plan: "UPSC Prelims Test Series Bundle",
          coupon: coupon || "NONE",
          email: email || "unknown"
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.error?.description || "Failed to create Razorpay order"
      });
    }

    return res.status(200).json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: keyId
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error creating Razorpay order" });
  }
};
