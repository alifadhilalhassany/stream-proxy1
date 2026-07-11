
export default async function handler(req, res) {
  const response = await fetch("https://def.yacinelive.com/api/channel/1502", {
    redirect: "follow",
    headers: {
      "User-Agent": "VLC/3.0.20",
      "Accept": "*/*"
    }
  });

  const contentType = response.headers.get("content-type") || "application/vnd.apple.mpegurl";

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", contentType);

  const body = await response.text();
  res.status(200).send(body);
}
