import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // نسمح فقط بطلبات POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // التحقق من الأمان: نتأكد إن الطلب جاي من Supabase فعلاً
    const incomingSecret = req.headers['webhook-signature'] || req.headers['x-webhook-secret'];
    const expectedSecret = process.env.WEBHOOK_SECRET;

    if (!expectedSecret || incomingSecret !== expectedSecret) {
      console.log('Webhook secret mismatch or missing');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // استخراج البيانات من الطلب اللي يرسله Supabase
    const payload = req.body;
    const userEmail = payload?.user?.email;
    const emailData = payload?.email_data;

    if (!userEmail || !emailData) {
      console.log('Missing user email or email_data in payload');
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const { token_hash, redirect_to, email_action_type } = emailData;
    const supabaseUrl = process.env.SUPABASE_URL;

    // بناء رابط التأكيد
    const confirmUrl = `${supabaseUrl}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${encodeURIComponent(redirect_to || '')}`;

    // تجهيز محتوى الإيميل حسب نوع العملية
    let subject = 'تأكيد حسابك في Booklish';
    let actionText = 'تأكيد الحساب';

    if (email_action_type === 'recovery') {
      subject = 'إعادة تعيين كلمة المرور - Booklish';
      actionText = 'إعادة تعيين كلمة المرور';
    } else if (email_action_type === 'magiclink') {
      subject = 'رابط الدخول - Booklish';
      actionText = 'تسجيل الدخول';
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #FAF8F5;">
        <h2 style="color: #9D381F; text-align: center;">Booklish</h2>
        <p style="color: #333; font-size: 16px; text-align: center;">
          اضغط على الزر أدناه لإتمام العملية
        </p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="${confirmUrl}" 
             style="background: #9D381F; color: #fff; padding: 14px 32px; 
                    border-radius: 8px; text-decoration: none; font-weight: bold; 
                    display: inline-block;">
            ${actionText}
          </a>
        </div>
        <p style="color: #888; font-size: 13px; text-align: center;">
          إذا لم تطلب هذا الإجراء، تجاهل هذا الإيميل.
        </p>
      </div>
    `;

    // إعداد Nodemailer عبر Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // إرسال الإيميل فعليًا
    await transporter.sendMail({
      from: `"Booklish" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`Email sent successfully to ${userEmail}`);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
