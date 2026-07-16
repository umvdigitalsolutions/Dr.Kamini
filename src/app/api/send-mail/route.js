import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { createPainReportPdf } from '@/lib/painReportPdf';

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function readAnatomyImage(dataUrl) {
  if (typeof dataUrl !== 'string' || dataUrl.length > 5_000_000) return null;
  const match = dataUrl.match(/^data:(image\/(?:png|jpeg));base64,([A-Za-z0-9+/=]+)$/);
  if (!match) return null;
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > 3_750_000) return null;
  return { mimeType: match[1], bytes };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, phone, painAssessment } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.RESEND_TO_EMAIL) {
      console.error('Mail environment variables are not fully configured.');
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);
    const regions = Array.isArray(painAssessment?.regions)
      ? painAssessment.regions.slice(0, 30)
      : [];
    const muscleImage = readAnatomyImage(painAssessment?.anatomyImages?.muscle);
    const boneImage = readAnatomyImage(painAssessment?.anatomyImages?.bone);
    const anatomyImages = [
      muscleImage && { ...muscleImage, label: 'Muscle anatomy view', contentId: 'muscle-anatomy' },
      boneImage && { ...boneImage, label: 'Skeleton anatomy view', contentId: 'bone-anatomy' },
    ].filter(Boolean);
    const assessment = {
      severity: Number(painAssessment?.severity) || 0,
      duration: painAssessment?.duration || 'Not provided',
      notes: painAssessment?.notes || '',
      anatomyLayer: painAssessment?.anatomyLayer || 'Anatomy',
      focusRegion: painAssessment?.focusRegion || 'Full body',
      view: painAssessment?.view || 'front',
      regions,
    };
    const reportPdf = await createPainReportPdf({
      patient: { name, email, phone },
      assessment,
      anatomyImages,
    });
    const painMapHtml = regions.length
      ? `
        <div style="background:#fff1f5;border:1px solid #fbcfe8;padding:20px;border-radius:14px;margin:0 0 22px;">
          <h3 style="margin:0 0 14px;color:#9f1239;font-size:17px;">Marked pain areas</h3>
          <ol style="margin:0;padding-left:20px;color:#334155;">
            ${regions.map((region) => `
              <li style="margin-bottom:10px;">
                <strong>${escapeHtml(region.region)}</strong><br />
                <span style="color:#64748b;font-size:13px;">${escapeHtml(region.muscle)} · ${escapeHtml(region.view)} view</span>
              </li>
            `).join('')}
          </ol>
        </div>
      `
      : '';

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      replyTo: email,
      subject: `${regions.length ? 'New Pain Map' : 'New Inquiry'} from ${String(name).slice(0, 80)}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
          </head>
          <body style="margin:0;background:#f1f5f9;font-family:Arial,sans-serif;color:#334155;line-height:1.6;">
            <div style="display:none;max-height:0;overflow:hidden;">New patient pain-map assessment with PDF report.</div>
            <div style="max-width:680px;margin:0 auto;padding:24px 12px;">
              <div style="overflow:hidden;border-radius:20px;background:#ffffff;box-shadow:0 10px 30px rgba(15,118,110,.12);">
                <div style="background:linear-gradient(135deg,#115e59,#0f766e);padding:30px;color:#ffffff;border-bottom:5px solid #ec4899;">
                  <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#ccfbf1;">DR. KAMINI SHAKYA</div>
                  <h1 style="margin:8px 0 4px;font-size:28px;line-height:1.2;">Patient Pain Assessment</h1>
                  <p style="margin:0;color:#d5f5f0;font-size:14px;">Physiotherapy Clinic · Website submission</p>
                </div>
                <div style="padding:26px;">
                  <h2 style="margin:0 0 16px;color:#0f766e;font-size:20px;">Patient details</h2>
                  <div style="background:#f0fdfa;border-radius:14px;padding:18px;margin-bottom:22px;">
                    <p style="margin:0 0 7px;"><strong>Name:</strong> ${safeName}</p>
                    <p style="margin:0 0 7px;"><strong>Email:</strong> <a style="color:#0f766e;" href="mailto:${safeEmail}">${safeEmail}</a></p>
                    ${phone ? `<p style="margin:0;"><strong>Phone:</strong> ${safePhone}</p>` : ''}
                  </div>
                  <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:8px 0;margin:0 -8px 22px;">
                    <tr>
                      <td style="background:#fff1f5;border-radius:12px;padding:14px;text-align:center;"><div style="color:#9f1239;font-size:24px;font-weight:700;">${escapeHtml(assessment.severity)}/10</div><div style="font-size:11px;color:#64748b;">PAIN INTENSITY</div></td>
                      <td style="background:#f0fdfa;border-radius:12px;padding:14px;text-align:center;"><div style="color:#0f766e;font-size:14px;font-weight:700;">${escapeHtml(assessment.focusRegion)}</div><div style="font-size:11px;color:#64748b;">ANATOMY REGION</div></td>
                      <td style="background:#f8fafc;border-radius:12px;padding:14px;text-align:center;"><div style="color:#334155;font-size:14px;font-weight:700;">${escapeHtml(assessment.duration)}</div><div style="font-size:11px;color:#64748b;">DURATION</div></td>
                    </tr>
                  </table>
                  ${muscleImage ? `
                    <h2 style="margin:0 0 12px;color:#0f766e;font-size:20px;">Muscle anatomy view</h2>
                    <img src="cid:muscle-anatomy" alt="Patient's focused muscle anatomy view" style="display:block;width:100%;height:auto;border-radius:14px;border:2px solid #0f766e;margin-bottom:22px;" />
                  ` : ''}
                  ${boneImage ? `
                    <h2 style="margin:0 0 12px;color:#0f766e;font-size:20px;">Skeleton anatomy view</h2>
                    <img src="cid:bone-anatomy" alt="Patient's marked skeleton anatomy view" style="display:block;width:100%;height:auto;border-radius:14px;border:2px solid #0f766e;margin-bottom:22px;" />
                  ` : ''}
                  ${painMapHtml}
                  <h2 style="margin:0 0 10px;color:#0f766e;font-size:20px;">Patient notes</h2>
                  <div style="white-space:pre-wrap;background:#f8fafc;border-left:4px solid #ec4899;padding:15px;color:#475569;">${safeMessage}</div>
                  <p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;">
                    A clinic-branded PDF report is attached for your records. This is patient-reported information and is not a medical diagnosis.
                  </p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      attachments: [
        {
          filename: 'pain-assessment-report.pdf',
          content: reportPdf,
          contentType: 'application/pdf',
        },
        ...anatomyImages.map((image) => ({
          filename: `${image.contentId}.${image.mimeType === 'image/png' ? 'png' : 'jpg'}`,
          content: image.bytes,
          contentType: image.mimeType,
          contentId: image.contentId,
        })),
      ],
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
