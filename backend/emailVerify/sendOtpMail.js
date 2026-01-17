import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendOtpMail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password reset otp',
        html: `<p>Your OTP is: <strong>${otp}</strong></p> <p>This OTP is valid for 10 minutes only.</p>`
    }

    await transporter.sendMail(mailOptions);
}