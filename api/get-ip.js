export default async function handler(req, res) {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();

    return res.status(200).json({
      outbound_ip: data.ip,
      note: "Use this IP in Msg91 whitelist",
    });
  } catch (error) {
    console.error("get-ip error:", error);
    return res.status(500).json({ error: error.message || "Failed to get IP" });
  }
}
