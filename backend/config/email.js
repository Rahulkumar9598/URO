import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "palrahul95987@gmail.com",
    pass: "cwdl bubj ssiq ogts",
  },
});

// Wrap in an async IIFE so we can use await.
// export const sendMail = async () => {
//   const info = await transporter.sendMail({
//     from: 'palrahul95987@gmail.com',
//     to: "sonivermasoni55@gmail.com",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// }

export const sendMail = async () => {
  const info = await transporter.sendMail({
    from: 'palrahul95987@gmail.com',
    to: "rahulcodes222@gmail.com",
    subject: "Sorry this message only for testing",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin:auto; background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <tr>
            <td style="background:#004aad; padding:20px; color:white; font-size:22px; font-weight:bold;">
              ✔ Hacked Notifcation
            </td>
          </tr>

          <tr>
            <td style="padding:20px; color:#333333; font-size:15px; line-height:1.6;">
              <p>Hi User,</p>

              <p>
               This email appears to be part of a phishing attempt.  
                     Your data could be at risk if you interact further
                     Engaging with it in any way may expose your data and allow unauthorized access.
                     
              </p>

              <p>
                If you did not request this action, please contact support immediately.
              </p>

              <a href="#" style="display:inline-block; padding:12px 20px; background:#004aad; color:white; text-decoration:none; border-radius:5px; margin-top:10px;">
                View Details
              </a>

              <p style="margin-top:20px;">
                Thank you,<br>
                <b>Your Support Team</b>
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#eeeeee; padding:10px; text-align:center; color:#777; font-size:12px;">
              © 2025 Your Company — All Rights Reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  });

  console.log("Message sent:", info.messageId);
};
