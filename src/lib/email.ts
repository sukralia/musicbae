import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendDownloadLink(
  to: string,
  songName: string,
  artistName: string,
  downloadUrl: string
) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: `Your MusicBae Download: ${songName} by ${artistName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366f1; text-align: center;">🎵 MusicBae</h1>
        <h2 style="color: #333;">Your Download is Ready!</h2>
        <p>Thank you for supporting <strong>${artistName}</strong>!</p>
        <p>Here's your high-quality download for: <strong>${songName}</strong></p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" 
             style="background: linear-gradient(135deg, #6366f1, #8b5cf6); 
                    color: white; 
                    padding: 15px 30px; 
                    text-decoration: none; 
                    border-radius: 25px; 
                    display: inline-block; 
                    font-weight: bold;">
            Download Song
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours. You can also access your downloads in your MusicBae dashboard.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          Music Before Anyone Else - Create, Share, Receive
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}

export async function sendApprovalNotification(
  to: string,
  artistName: string,
  isApproved: boolean
) {
  const subject = isApproved 
    ? `🎉 Your MusicBae Profile is Live!` 
    : `Update on Your MusicBae Submission`;

  const content = isApproved 
    ? `
      <h2 style="color: #10b981;">Congratulations, ${artistName}!</h2>
      <p>Your artist profile has been approved and is now live on MusicBae!</p>
      <p>Fans can now discover your music and show their support through tips.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="background: linear-gradient(135deg, #10b981, #059669); 
                  color: white; 
                  padding: 15px 30px; 
                  text-decoration: none; 
                  border-radius: 25px; 
                  display: inline-block; 
                  font-weight: bold;">
          View Your Dashboard
        </a>
      </div>
    `
    : `
      <h2 style="color: #ef4444;">Submission Update</h2>
      <p>Thank you for your submission to MusicBae.</p>
      <p>Unfortunately, your profile was not approved at this time. Please review our guidelines and feel free to submit again.</p>
    `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366f1; text-align: center;">🎵 MusicBae</h1>
        ${content}
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #999; font-size: 12px; text-align: center;">
          Music Before Anyone Else - Create, Share, Receive
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
} 