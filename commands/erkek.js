const Discord = require("discord.js")
const db = require("quick.db")
const ayarlar = require("../ayarlar.json")

module.exports.run = async (client, message, args) => {
    if(!ayarlar.yetkiliRol.some(arwww => message.member.roles.cache.has(arwww)) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Bu işlemi gerçekleştirmek için gerekli yetkin yok!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  
    const etiketlenenKişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!etiketlenenKişi) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Kaydetmek için bir kişi etiketlemelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))
  
const isim = args.splice(1).join(' ')
if(!isim) return message.channel.send(`${client.emojis.cache.get(ayarlar.no)} **Kaydetmek için bir isim belirtmelisin!**`).then(message.react(client.emojis.cache.get(ayarlar.no)))

etiketlenenKişi.roles.add(ayarlar.erkekRol1)
etiketlenenKişi.roles.add(ayarlar.erkekRol2)
etiketlenenKişi.roles.remove(ayarlar.kayıtsızRol)
etiketlenenKişi.setNickname(`${isim} Shex`)

message.react(client.emojis.cache.get(ayarlar.yes))

const arwEmbed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`Kullanıcının ismi \`${isim} Shex\` olarak değiştirildi ve <@&${ayarlar.erkekRol1}>, <@&${ayarlar.erkekRol2}> rolleri verildi!`)
.setFooter(ayarlar.footer)
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setTimestamp()

message.channel.send(arwEmbed)

db.push(`isimler.${etiketlenenKişi.id}`, {
İsim: isim,
Yetkili: message.author.id
})

db.add(`erkekTeyit.${message.member.id}`, `1`)
db.add(`toplamTeyit.${message.member.id}`, `1`)

client.channels.cache.get(ayarlar.sohbetKanal).send(`${client.emojis.cache.get("821487268056399892")}  ${etiketlenenKişi} **kaydolarak sunucuya giriş yaptı. Hoşgeldin!**`)
  
}
exports.config = {
    name: "erkek",
    guildOnly: true,
    aliases: ["e", "male"]
}