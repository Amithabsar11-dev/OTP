export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const response = await fetch("https://control.msg91.com/api/v5/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authkey: process.env.MSG91_AUTH_KEY, 
      },
      body: JSON.stringify({
        mobile: `91${phone}`,
        template_id: process.env.MSG91_TEMPLATE_ID, 
        otp_length: 6,
        realTimeResponse: 1,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("send-otp error:", err);
    return res.status(500).json({ error: err.message || "Internal error" });
  }
}
