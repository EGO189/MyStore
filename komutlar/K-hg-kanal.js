const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
   if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`${message.author} Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın!`)).then(m => m.delete({timeout: 7000}))
let kanal = message.mentions.channels.first();
if(!kanal) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`Lütfen Bir Hoşgeldin Kanalı Belirtiniz.`))
// Sunucuya Giren üyenin hoşgeldin mesajı nereye atılacak onu belirlersiniz
const embed = new MessageEmbed()
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setDescription(`Hoşgeldin Kanalı Başarıyla ${kanal} olarak ayarlandı.`)
message.channel.send(embed)
db.set(`hgkanal_${message.guild.id}`, kanal.id)
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['hgkanal','hg-kanal'],
  permLevel: 0 
};

exports.help = {
  name: 'hg-kanal'
};