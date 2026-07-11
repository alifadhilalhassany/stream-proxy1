
export default async function handler(req, res) {
    const apiUrl = 'https://def.yacinelive.com/api/channel/1502';

    try {
        // 1. جلب البيانات من الـ API مع Headers الموبايل
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11)',
                'Accept': 'application/json'
            }
        });

        const data = await response.json();
        
        // 2. استخراج الرابط (تأكد من اسم المفتاح الصحيح)
        const m3u8Link = data.url || data.stream_url; 

        if (m3u8Link) {
            // 3. السحر هنا: توجيه مشغل AppCreator24 مباشرة إلى رابط البث!
            res.redirect(307, m3u8Link);
        } else {
            res.status(404).send('لم يتم العثور على رابط البث');
        }

    } catch (error) {
        res.status(500).send('حدث خطأ في السيرفر');
    }
}
