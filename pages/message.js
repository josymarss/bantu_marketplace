import Nexmemo from 'nexmo'

export default function SendMessage(name, phone, app = null){
    const nexmemo = new Nexmemo({
        apiKey:process.env.API_KEY_SMS,
        apiSecret:process.env.API_SECRET_SMS
    })
    const messageApp = `O usuário ${name} enviou-te uma soliciatção de negociação do aplicativo ${app.name}`
    const messageForNewPassword = `seu código de confirmação é ${Math.random() * 1045}`
    const from = 'bantu-marketplace'
    const to = phone
    //check the internet connection first
    //if has internet connection, send and return true 
    const sended = nexmemo.message.sendSms(
        from,
        to,
        app === null ? messageForNewPassword : messageApp
    )
    return sended ? true : false
}