export default async function handler(req, res) {
  const response = await fetch("https://def.yacinelive.com/api/channel/1502");

  const stream = await response.text(); // إذا كان الـ API يرجع الرابط كنص

  res.writeHead(302, {
    Location: stream.trim()
  });

  res.end();
}
