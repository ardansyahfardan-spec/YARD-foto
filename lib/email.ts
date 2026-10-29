import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function notifyAdmin(subject: string, html: string) {
  if (!resend) {
    console.warn('RESEND_API_KEY belum diatur; notifikasi admin tidak dikirim.');
    return { skipped: true } as const;
  }
  const from = process.env.EMAIL_FROM;
  const to = process.env.ADMIN_EMAIL;
  if (!from || !to) throw new Error('EMAIL_FROM dan ADMIN_EMAIL harus diatur.');
  const result = await resend.emails.send({ from, to, subject, html });
  if (result.error) throw new Error(result.error.message);
  return { skipped: false, id: result.data?.id } as const;
}
