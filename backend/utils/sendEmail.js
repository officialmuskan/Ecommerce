const nodmail = require('nodemailer')
const sendEmail = async(options)=>{
    const transporter = nodmail.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user: 'helloiammuskan8@gmail.com',
            pass: 'snvp xhfs haej mvgs',
        }
    })
    console.log(process.env.SMPT_MAIL)
    const mailoptions = {
        from:"",
        to:options.email,
        subject:options.subject,
        text:options.message
    }
    await transporter.sendMail(mailoptions)
}
module.exports=sendEmail