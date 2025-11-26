export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ error: "Phone & OTP are required" });
  }

  try {
    const url = `https://control.msg91.com/api/v5/otp/verify?mobile=91${phone}&otp=${otp}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        authkey: process.env.MSG91_AUTH_KEY,
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("verify-otp error:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
