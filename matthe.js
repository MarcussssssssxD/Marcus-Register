// Sorununz olursa Matthe#0001 ulaşınız. https://discord.gg/vAKkqEqgfE

const Discord = require("discord.js")
const client = new Discord.Client()
const ayarlar = require("./ayarlar.json")
const moment = require("moment")//Matthe#0001
const fs = require("fs")
const db = require("quick.db")
const chalk = require("chalk")
require('./util/Loader.js')(client)

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`)//Youtube Matthe
  files.forEach(f => {                    
    let props = require(`./commands/${f}`)
    console.log(`${props.config.name} komutu yüklendi.`)
    client.commands.set(props.config.name, props)
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name)
    });
  });
})

client.on('message', async message => {
  
  if(message.content === '.tag') {
    message.channel.send(`\`${ayarlar.tag}\``)//Youtube Matthe
  }
  })

client.on("ready", () => {
    console.log(chalk.redBright(`tm`))
})

// BOTUN İNTENTLERİNİ AÇMAYI UNUTMAYIN 

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `0`,
            '1': `1`,
            '2': `2`,
            '3': `3`,
            '4': `4`, // BOTUN OLDUĞU SUNUCUDA OLMA ŞARTI İLE HARAKETLİ EMOJİDE KOYABİLİRSİNİZ
            '5': `5`,
            '6': `6`,
            '7': `7`,
            '8': `8`,
            '9': `9`}[d];})}
    const kanal = member.guild.channels.cache.find(r => r.id === (ayarlar.hosgeldinKanal)); // HOŞGELDİNİZ KANAL İD
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
     const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    var kontrol;
  if (kurulus < 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için daha çok genç! :x: `
  if (kurulus > 1296000000) kontrol = `Ve senin hesabın sunucumuza kayıt olmak için tüm şartları karşılıyor! :ballot_box_with_check: `
    moment.locale("tr");
  
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)
member.roles.add(ayarlar.kayıtsızRol)//Youtube Matthe
  
    kanal.send(`
Sunucumuza hoş geldin, <@`+ member + `>! Sayende sunucumuz **`+üyesayısı+`** kişi. 
    
Sunucumuza kayıt olmak için soldaki ses kanallarından birine girmelisin!

Ayrıca hesabın 15 günden fazla bir süredir Discord'da bulunmalı.

`+kontrol+`
    
Ceza işlemlerin <#KURALLAR KANALI ID> kanalını okuduğun varsayılarak uygulanır. ( <@&HOS GELDİN MESAJ YETKİLİ ROL ID> )`)});

client.login(process.env.TOKEN)

client.on("ready", () => {
  client.channels.cache.get(ayarlar.botSesKanal).join();
  });
//Youtube Matthe
//----------------------------------------------------- TAG ROL ------------------------------------------------\\

// tag rol kodu bana ait değildir, geliştirip sizlere sundum.
client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = "847733452643368990"// sunucu ıd
    const roleID = "847741789019963394"// taglı rolünüzün ıd
    const tag = "Force"// tagınız
    const chat = '847743477516075009'// chat kanalı ıd
    const taglog = '847744584075444226' // log kanalı ıd
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0010').setTimestamp().setFooter('Matthe was here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Tagımızı alarak ailemize katıldı!**`)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı tagımızı aldığı için taglı rolü verildi!`))
        }
    }
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "1110" && newUser.discriminator !== "1110") {
            member.roles.remove(roleID)
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı çıkardığı için taglı rolü alındı!`))
        } else if (oldUser.discriminator !== "1110" && newUser.discriminator == "1110") {
            member.roles.add(roleID)-
            client.channels.cache.get(taglog).send(embed.setDescription(`${newUser} Kullanıcısı etiket tagımızı aldığı için taglı rolü verildi!`))
            client.channels.cache.get(chat).send(`**Mükemmel! ${newUser} Etiket tagımızı alarak ailemize katıldı!**`)
        }
    }
  
  })

//----------------------------------------------------- TAG ROL ------------------------------------------------\\