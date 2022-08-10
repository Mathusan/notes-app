const nodemailer = require('nodemailer')    

const emailVerify = async (email,subject,text)=>{
    try {
        const transporter  = nodemailer.createTransport({
            name: 'example.com',
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER.toString(),
                pass:process.env.PASS.toString()
            } 
        })

        await transporter.sendMail({
            from: process.env.USER,
            to:email,
            subject:subject,
            text:text 
        })
        console.log("Email sent successfully")
    } catch (err) {
        console.log("Email not sent")
        console.log(err)
        
    }
}

module.exports = emailVerify