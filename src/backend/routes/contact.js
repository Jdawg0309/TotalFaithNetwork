const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,  // your Yahoo email
      pass: process.env.EMAIL_PASS   // Yahoo App Password
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,    // Always from your account
    to: process.env.EMAIL_USER,      // Always sent to your account
    subject: `[TFN Contact] ${subject}`,
    text: `
You received a new message from the contact form:

Name: ${name}
Email: ${email}

Message:
${message}
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 New contact form submission from ${email}`);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
