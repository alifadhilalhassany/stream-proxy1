export default async function handler(req, res) {
  try {
    const response = await fetch("https://def.yacinelive.com/api/channel/1502", {
      redirect: "follow"
    });

    // إذا وصلنا إلى الرابط النهائي
    res.writeHead(302, {
      Location: response.url
    });

    res.end();

  } catch (e) {
    res.status(500).send(e.toString());
  }
}
