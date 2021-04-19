const nodemailer = require('nodemailer');

const sendEmail   = async options =>{
    //1) Create Transpoerrter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SEND_SESSION,
            pass: process.env.EMAIL_SEND_PASSWORD,
      }
    });

    //2) Mail Options
    const mailOptions = {
        from:'Draggable Pannel <deosebitsoft@gmail.com>',
        to:options.email,
        subject:options.subject,
        html:options.message
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;