const { Telegraf } = require('telegraf')
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const teddy = new TelegramBot('5892993439:AAHvQqhtK9RLNZgFJVPKozUv_Q4LGTIVWOU')
const bot = new Telegraf("5892993439:AAHvQqhtK9RLNZgFJVPKozUv_Q4LGTIVWOU")

const { fetchJson, range, parseMarkdown } = require('./lib/function')
const help = require('./lib/help')
const tele = require('./lib/tele')
const fs = require('fs')
const { ia } = require('./lib/ia.js')
const consultarCep = require('correios-brasil')

//defina
const donom = "`teddyzinofc`"; //dono
const canal = "`havitysearch`";
//obs é oque aparece em baixo das consultas

const { exec, spawn, execSync } = require('child_process')

//const das consultas e vips
const sinespApi = require('sinesp-api');
const { CNPJ } = require('cnpj-consulta')
const cep = require('cep-promise')
const ip = require('ip-promise')
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const premium = JSON.parse(fs.readFileSync('./database/user/premiuns.json'))
const ownerID = [`${setting.ownerID}`]
const vipID = [`${setting.vipID}`]
const grupvipID = [`${setting.grupvipID}`]
const ifindApikey = [`${setting.ifindApikey}`]

const chalk = require('chalk')
const os = require('os')
const { apikey, bot_token, owner, ownerLink, version, prefix} = JSON.parse(fs.readFileSync(`./src/config.json`))


//Ligando o Bot caso ele consiga acessar o token 



bot.command('start', async(lxrd) => {
    user = tele.getUser(lxrd.message.from)
    await help.start(lxrd, user.full_name)
    
})
bot.command('menu', async(lxrd) => {
    user = tele.getUser(lxrd.message.from)
    await help.help(lxrd, user.full_name, lxrd.message.from.id.toString())
})

bot.on("callback_query", async(lxrd) => {
    cb_data = lxrd.callbackQuery.data.split("-")
    user_id = Number(cb_data[1])
    callback_data = cb_data[0]
    user = tele.getUser(lxrd.callbackQuery.from)
    const isGroup = lxrd.chat.type.includes("group")
    const groupName = isGroup ? lxrd.chat.title : ""
    if (!isGroup) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ AÇÕES ]"), chalk.whiteBright(callback_data), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
    if (isGroup) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ AÇÕES ]"), chalk.whiteBright(callback_data), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))
    if (callback_data == "help") return await help[callback_data](lxrd, user.full_name, user_id)
    await help[callback_data](lxrd, user_id.toString())
})

bot.on("message", async(lxrd) => {
    try {
        const body = lxrd.message.text || lxrd.message.caption || lxrd.from.id || ""
        comm = body.trim().split(" ").shift().toLowerCase()
        cmd = false
        if (prefix != "" && body.startsWith(prefix)) {
            cmd = true
            comm = body.slice(1).trim().split(" ").shift().toLowerCase()
        }
        user_id = lxrd.from.id
        const command = comm
        const args = await tele.getArgs(lxrd)
        const user = tele.getUser(lxrd.message.from)
        
        

        const reply = async(text) => {
            for (var x of range(0, text.length, 4096)) {
                return await lxrd.replyWithMarkdown(text.substr(x, 4096), { disable_web_page_preview: true })
            }
        }
        
        
        
        
        
        const isCmd = cmd
        const isGroup = lxrd.chat.type.includes("group")
        const groupName = isGroup ? lxrd.chat.title : ""
        
        ///const de vip 
        const sender = lxrd.from.id || lxrd.chat.id
        const lx = "```"
        const tesk = args.join(" ")
        
//const tel1 = JSON.parse(fs.readFileSync('./db/tel/tel.json'))

//const tel2 = JSON.parse(fs.readFileSync('./db/tel/tel2.json'))

//const tel3 = JSON.parse(fs.readFileSync('./db/tel/tel3.json'))
//const tel4 = JSON.parse(fs.readFileSync('./db/tel/tel4.json'))

//const cpf1 = JSON.parse(fs.readFileSync('./db/cpf1/cpf.json'))

//const cpf2 = JSON.parse(fs.readFileSync('./db/cpf2/cpf.json'))
//const cpf3 = JSON.parse(fs.readFileSync('./db/cpf3/cpf.json'))
//const nome = JSON.parse(fs.readFileSync('./db/nome/nome.json'))
//const score = JSON.parse(fs.readFileSync('./db/score/score.json'))
//const placa = JSON.parse(fs.readFileSync('./db/placa/placa.json'))
        
        const isGpvip = grupvipID[0].includes("group")
        const isOwner = ownerID[0].includes(sender)
        const isPremium = premium.includes(sender)
        const isVip = vipID[0].includes(sender)
        var fome = [5436323543]
        const isImage = lxrd.message.hasOwnProperty("photo")
        const isVideo = lxrd.message.hasOwnProperty("video")
        const isAudio = lxrd.message.hasOwnProperty("audio")
        const isSticker = lxrd.message.hasOwnProperty("sticker")
        const isContact = lxrd.message.hasOwnProperty("contact")
        const isLocation = lxrd.message.hasOwnProperty("location")
        const isDocument = lxrd.message.hasOwnProperty("document")
        const isAnimation = lxrd.message.hasOwnProperty("animation")
        const isMedia = isImage || isVideo || isAudio || isSticker || isContact || isLocation || isDocument || isAnimation

        const quotedMessage = lxrd.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.hasOwnProperty("photo")
        const isQuotedVideo = quotedMessage.hasOwnProperty("video")
        const isQuotedAudio = quotedMessage.hasOwnProperty("audio")
        const isQuotedSticker = quotedMessage.hasOwnProperty("sticker")
        const isQuotedContact = quotedMessage.hasOwnProperty("contact")
        const isQuotedLocation = quotedMessage.hasOwnProperty("location")
        const isQuotedDocument = quotedMessage.hasOwnProperty("document")
        const isQuotedAnimation = quotedMessage.hasOwnProperty("animation")
        const isQuoted = lxrd.message.hasOwnProperty("reply_to_message")

        var typeMessage = body.substr(0, 50).replace(/\n/g, '')
        if (isImage) typeMessage = "Image"
        else if (isVideo) typeMessage = "Video"
        else if (isAudio) typeMessage = "Audio"
        else if (isSticker) typeMessage = "Sticker"
        else if (isContact) typeMessage = "Contact"
        else if (isLocation) typeMessage = "Location"
        else if (isDocument) typeMessage = "Document"
        else if (isAnimation) typeMessage = "Animation"

        if (!isGroup && !isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ PRIVADO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
        if (isGroup && !isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[  GRUPO  ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))
        if (!isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ COMANDO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name))
        if (isGroup && isCmd) console.log(chalk.whiteBright("├"), chalk.cyanBright("[ COMANDO ]"), chalk.whiteBright(typeMessage), chalk.greenBright("a partir de"), chalk.whiteBright(user.full_name), chalk.greenBright("no"), chalk.whiteBright(groupName))

        var file_id = ""
        if (isQuoted) {
            file_id = isQuotedImage ? lxrd.message.reply_to_message.photo[lxrd.message.reply_to_message.photo.length - 1].file_id :
                isQuotedVideo ? lxrd.message.reply_to_message.video.file_id :
                isQuotedAudio ? lxrd.message.reply_to_message.audio.file_id :
                isQuotedDocument ? lxrd.message.reply_to_message.document.file_id :
                isQuotedAnimation ? lxrd.message.reply_to_message.animation.file_id : ""
        }
        var mediaLink = file_id != "" ? await tele.getLink(file_id) : ""

        switch (command) {
        //CONSULTAS AQUI🔥
        case 'cnpj3': 
        reply_to_message_id=`${lxrd.message.caption}`
vnc = await fetchJson(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${tesk}`)
reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

*🔍 Consulta de CNPJ 🔎*\n\n
NOME FANTASIA: ${vnc["NOME FANTASIA"]}
RAZAO SOCIAL: ${vnc["RAZAO SOCIAL"]}
CNPJ: ${vnc.CNPJ}
STATUS: ${vnc.STATUS}
SETOR: ${vnc.SETOR} 
CEP: ${vnc.CEP}
DATA ABERTURA: ${vnc["DATA ABERTURA"]}
DDD: ${vnc.DDD}
TELEFONE: ${vnc.TELEFONE}
EMAIL: ${vnc.EMAIL}
TIPO LOGRADOURO: ${vnc["TIPO LOGRADOURO"]}
LOGRADOURO: ${vnc.LOGRADOURO}
NUMERO: ${vnc.NUMERO}
COMPLEMENTO: ${vnc.COMPLEMENTO}
BAIRRO: ${vnc.BAIRRO}
MUNICIPIO: ${vnc.MUNICIPIO}
UF: ${vnc.UF}
CNAE PRINCIPAL DESCRICAO: ${vnc["CNAE PRINCIPAL DESCRICAO"]}
CNAE PRINCIPAL CODIGO: ${vnc["CNAE PRINCIPAL CODIGO"]}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
`) //SE TIRAR OS CREDITOS É GAY
break

case "cep":{
reply(`*CONSULTANDO CEP: ${tesk} 🔍*`)
const { consultarCep } = require('correios-brasil');

// Cep pode ser String ou Number
const cep = tesk; // 21770200 , '21770-200', '21770 200'.... qualquer um formato serve

consultarCep(cep).then(response => {
  reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

logradouro : ${response.data.logradouro}
complemento : ${response.data.complemento}
bairro : ${response.data.bairro}
localidade : ${response.data.localidade}
uf : ${response.data.uf}
ibge : ${response.data.ibge}
gia : ${response.data.gia}
ddd : ${response.data.ddd}
siafi : ${response.data.siafi}

 𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
  `)
});
}break

case "score":
reply(`*CONSULTANDO SCORE: ${tesk} 🔍*`)
japa = await axios.get(`https://japa-puxxadas.herokuapp.com/score?q=${tesk}&modelo=1&apikey=Paulo`)
reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

  ${japa.data.message}

 𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
`)
break

case 'placa':
reply(`*CONSULTANDO PLACA: ${tesk} 🔍*`)
if (!tesk) return reply(`cade o ${command}`)
japa = await axios.get(`https://japa-puxxadas.herokuapp.com/placa?q=${tesk}&apikey=Paulo`) 
reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

${japa.data.message}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
`)
break

case "nome":{
//@The_Teddy_Modz
reply(`*CONSULTANDO NOME: ${tesk} 🔍*`)
if (!tesk) return
japa = await axios.get(`https://japa-puxxadas.herokuapp.com/nome?q=${tesk}&apikey=Paulo`)
        reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

${japa.data.message}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
        `)
}
break


case 'ia':
if (args.length < 1) return reply(`Exemplo: ${prefix + command} quem criou o minecraft?`)
reply("consultando💤...")
try {
let openai = await ia(args.join(' '))
let response = openai[0].resposta
reply(response)
} catch(e) {
console.log(e)
reply('Erro, porfavor contate o Dono.')
}
break

case 'score':
reply(`*CONSULTANDO SCORE: ${tesk} 🔍*`)
if (!tesk) return reply(`cade o ${command}`)
japa = await axios.get(`https://japa-puxxadas.herokuapp.com/placa?q=${tesk}&apikey=Paulo`) 
reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

${japa.data.message}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
`)
break


case 'bin':
if (!tesk) return reply(`Use assim: ${prefix}${command} 45717360`)
try {
reply(`*CONSULTANDO BIN: ${q} 🔍*`)
havity = await fetchJson(`https://lookup.binlist.net/${tesk}`)
reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

*INFOS GENERICAS 🔒* 
❱ LENGTH: ${havity.number.length}
❱ LUHN: ${havity.number.luhn}\n\n
*INFOS CARD 💳*
❱ BANDEIRA: ${havity["scheme"]}
❱ TIPO: ${havity["type"]}
❱ BRAND: ${havity["brand"]}
❱ PREPAID: ${havity["prepaid"]}\n\n
*INFOS BANK 🏦*
❱ BANK NAME: ${havity.bank["name"]}
❱ BANK URL: ${havity.bank["url"]}
❱ BANK PHONE: ${havity.bank["phone"]}
❱ BANK CITY: ${havity.bank["city"]}\n\n
*INFOS LOC 📍*
❱ NUMERIC: ${havity.country["numeric"]}
❱ ALPHA2: ${havity.country["alpha2"]}
❱ NAME: ${havity.country["name"]}
❱ CURRENCY: ${havity.country["currency"]}
❱ LATITUDE: ${havity.country["latitude"]}
❱ LONGITUDE: ${havity.country["longitude"]}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
`)
} catch {
return reply(`*Bin invalida*`)
}
break
            
case "telefone":
case "tel":{
//@The_Teddy_Modz
reply(`*CONSULTANDO TEL: ${tesk} 🔍*`)
japa = await axios.get(`https://japa-puxxadas.herokuapp.com/tel?q=${tesk}&modelo=1&apikey=Paulo`)
        reply(`
🔍 ⚡️ 「𝐻𝑎𝑣𝑖𝑡𝑦 𝑆𝑒𝑎𝑟𝑐ℎ」 ⚡️ 🔎

${japa.data.message}

𝐷𝑜𝑛𝑜 𝑑𝑜 𝑏𝑜𝑡: ${donom}
𝐶𝑎𝑛𝑎𝑙: ${canal}
        `)
                    
      
}
break

        //FIM DAS CONSULTAS
        
case "ddd":
havity = await fetch(`https://bryan-api.bryan00066.repl.co/api/search/ddd?ddd=${tesk}&apikey=bryan23`)
reply(`
${havity.resultado}
`)
break
        
        case "dbtel":
        if (!isOwner) return reply("apenas o dono pode usar esse comando")
        reply("aguarde")
        teddy.sendDocument(lxrd.from.id, "db/tel/tel.json")
        break
        
        	case 'vipid':
				
					
					
					console.log(isPremium)
					console.log(sender)
					console.log(isOwner)
					
					break
					case"cteste":
                  //	teddy.sendDocument(lxrd.chat.id, `db/tel/${tesk}.txt`)				
					break
					case "aqteste":
					exec(`touch ./db/tel/${tesk}.json`)
					break
            case 'addvip':
				
					if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					addp = args.join(" ")
					fome.push(`${addp}`)

					
					reply(`Adicionado com sucesso ${addp} para a lista premium`)
					break
case 'dellvip':
				if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					oh = args.join(" ")
					delp = premium.indexOf(oh)
					premium.splice(delp, 1)
					fs.writeFileSync('src/settings.json', JSON.stringify(premium))
					reply(`Excluído com sucesso ${oh} Da Lista VIP`)
					break		
					case 'addgpvip':
				
					if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					addp = args.join(" ")
					gpvip.push(`${addp}`)
                    fs.writeFileSync('database/user/gpvip.json', JSON.stringify(gpvip))
					
					reply(`Adicionado com sucesso ${addp} para a lista premium`)
					break
case 'dellgpvip':
				if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					oh = args.join(" ")
					delp = gpvip.indexOf(oh)
					gpvip.splice(delp, 1)
					fs.writeFileSync('database/user/gpvip.json', JSON.stringify(gpvip))
					reply(`Excluído com sucesso ${oh} Da Lista VIP`)
					break		
		case 'listprem':
				if (!isOwner) return reply("Comando apenas para o proprietário do bot")
					
					 
					teks = `╭─「 *ID DE USUÁRIOS VIP* 」\n`
					no = 0
					for (let prem of fome) {
						no += 1
						teks += `│「${no.toString()}」 ${lx}${prem}${lx}\n`
					}
					
					teks += `│\n│ ID de usuários VIP : ${fome.length}\n╰───「 *Havity Search* 」`
					reply(teks.trim())  
					break
case 'print': 
const user = tele.getUser(lxrd.message.from)
a = premium.data.replace(/"/g, '')
console.log(a)


break
case 'API':
const teski = args.join(" ")

var lxrd = "python3 api.py `${teski}`"

exec(lxrd, (err) => {

if(err) return reply(`${err}`)

})

const res = JSON.parse(fs.readFileSync(`./src/consulta.json`))

reply(`*「 C O N S U L T A S 」*
╴
「⎋」 *RESPOSTA EM JSON*: ${res}
「⎋」 *RESPOSTA EM STRING*: ${res.cpf}


ETC VC VAI ENTENDER

╴
×•-•-•⟮ Consulta ⟯•-•-•×`)


break




            case 'menu':
            case 'help':
                await help.help(lxrd, user.full_name, lxrd.message.from.id.toString())
                break

            case 'setkey':
if (args.length < 1) return
if (!isOwner) return reply(ind.ownerb())
ifindApikey = tesk
setting.ifindApikey = ifindApikey
fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
reply(`key do iFind foi mudado para : ${ifindApikey}`)
break

            case 'id':
            
            await reply(`${lxrd.message.from.id}`)
            break
            case 'grupid':
           
            
            await reply(`${lxrd.chat.id}`)
            break
default:

if (body.startsWith('$')){
if (!isOwner) return 
var konsol = body.slice(1)
exec(konsol, (err, stdout) => {
if(err) return reply(`${err}`)
if (stdout) {
reply(`${stdout}`)
}
})
} 
            
        }//cases e defaut
        
        
        
        
  } catch (e) {
        console.log(chalk.whiteBright("├"), chalk.cyanBright("[  E R R O  4 0 4  ]"), chalk.redBright(e))
  }
}); 
bot.launch()
bot.telegram.getMe().then((getme) => {
    itsPrefix = (prefix != "") ? prefix : "Sem prefixo"
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.greenBright(" │ + Proprietário    : " + owner || ""))
    console.log(chalk.greenBright(" │ + Nome do bot : " + getme.first_name || ""))
    console.log(chalk.greenBright(" │ + Versão  : " + version || ""))
    console.log(chalk.greenBright(" │ + Host     : " + os.hostname() || ""))
    console.log(chalk.greenBright(" │ + Plataforma : " + os.platform() || ""))
    console.log(chalk.greenBright(" │ + Prefix   : " + itsPrefix))
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.whiteBright('╭─── [ REGISTROS ]'))
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

const express = require("express");
const app = express();

app.get("/", function(req, res){
res.sendFile(__dirname + "/carregamento.html");
});

app.get("/index.html", function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.get("/ajuda.html", function(req, res){
res.sendFile(__dirname + "/ajuda.html");
});
 
 const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log('Conectando...')
    console.log("Servidor rodando em http://localhost:" + PORT)
})

module.exports = app