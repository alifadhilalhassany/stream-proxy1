
export default async function handler(req, res) {
    const apiUrl = 'https://def.yacinelive.com/api/channel/1502';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                // قد نحتاج إلى ترويسات أدق هنا
                'User-Agent': 'Dalvik/2.1.0 (Linux; U; Android 11)', 
                'Accept': 'application/json'
            }
        });

        // سنقرأ الرد كنص أولاً لتجنب انهيار الكود إذا كان الرد صفحة حماية HTML
        const text = await response.text(); 

        try {
            // محاولة تحويل النص إلى JSON
            const data = JSON.parse(text);
            
            // حاول إيجاد الرابط
            const m3u8Link = data.url || data.stream_url || data.data?.url; 

            if (m3u8Link) {
                res.redirect(307, m3u8Link);
            } else {
                // إذا كان الـ JSON صحيحاً لكن لم نجد الرابط، سنعرض هيكل البيانات
                res.status(404).json({ error: "لم يتم العثور على المفتاح الصحيح للرابط", responseData: data });
            }
        } catch (parseError) {
            // إذا فشل التحويل إلى JSON، فهذا يعني أن السيرفر حظر الطلب وأرسل صفحة HTML
            res.status(500).send(`
                <h3>السيرفر الهدف رفض الطلب (ربما بسبب الحماية):</h3>
                <p>الحالة: ${response.status}</p>
                <textarea style="width:100%; height:300px;">${text}</textarea>
            `);
        }

    } catch (error) {
        res.status(500).json({ error: 'فشل الاتصال بالكامل', details: error.message });
    }
}
