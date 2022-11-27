const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
   if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`${message.author} Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın!`)).then(m => m.delete({timeout: 7000}))
let kanal = message.mentions.channels.first();
if(!kanal) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`Lütfen Bir Kayıt Log Belirtiniz.`))

const embed = new MessageEmbed()
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setDescription(`Kayıt Log Kanalı Başarıyla ${kanal} olarak ayarlandı.`)
message.channel.send(embed)
db.set(`kayıtlog_${message.guild.id}`, kanal.id)
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['kayıtlog','kayıt-log'],
  permLevel: 0 
};

exports.help = {
  name: 'kayıt-log'
};