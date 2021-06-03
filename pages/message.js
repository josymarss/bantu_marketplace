import Nexmemo from 'nexmo'

export default function SendMessage({ app, myName, }){
    const nexmemo = new Nexmemo({
        apiKey:process.env.API_KEY_SMS,
        apiSecret:process.env.API_SECRET_SMS
    })
    const { name } = app
    const {phone} = app.user
    const message = `the ${myName} enviou-te uma soliciatção de negociação do aplicativo ${name}`
    const from = 'bantu-marketplace'
    const to = phone
    //check the internet connection first
    // if internet, send and return true 
    const sended = nexmemo.message.sendSms(from,to,message)
    return sended ? true : false
}