import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import { Webhook } from 'standardwebhooks';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function getRawBody(req: VercelRequest): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = await getRawBody(req);

    const webhookSecret = (process.env.WEBHOOK_SECRET as string).replace('v1,whsec_', '');
    const wh = new Webhook(webhookSecret);

    let payload: any;
    try {
      payload = wh.verify(rawBody, req.headers as Record<string, string>);
    } catch (err) {
      console.log('Webhook signature verification failed:', err);
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const userEmail = payload?.user?.email;
    const emailData = payload?.email_data;

    if (!userEmail || !emailData) {
      console.log('Missing user email or email_data in payload');
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const { token_hash, redirect_to, email_action_type } = emailData;
    const supabaseUrl = process.env.SUPABASE_URL;

    console.log('DEBUG email_data:', JSON.stringify(emailData));
    console.log('DEBUG token_hash value:', token_hash);

const siteUrl = 'https://booklish-read-learn.vercel.app';
const confirmUrl = `${siteUrl}/auth/confirm?token_hash=${token_hash}&type=${email_action_type}&redirect_to=${encodeURIComponent(redirect_to || '')}`;


    console.log('DEBUG confirmUrl:', confirmUrl);

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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

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
