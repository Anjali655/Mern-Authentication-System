
import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const verifyMail = async (token, email) => {
    const emailTemplateSource = fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8');
    const template = handlebars.compile(emailTemplateSource);
    const htmlToSend = template({ token: encodeURIComponent(token) });

    // Logic to verify the email using the token and email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        html: htmlToSend
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.log('Error occurred: ' + error.message);
        } else {
            console.log('Email sent successfully: ' + info.response);
        }
    });
}

export default verifyMail;