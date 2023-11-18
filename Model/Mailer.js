import nodemailer from 'nodemailer'

class Nodemailer{

    transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "", //email
            pass: "", //key
        }
    });

    sendMail = async email => {
        try {
            const info = await this.transporter.sendMail({
                from: '"ApiResto" <tomas.spabentti@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "prueba ✔", // Subject line
                html: "<b>prueba</b>", // html body
            });

            console.log("Message sent: %s", info.messageId);
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default Nodemailer