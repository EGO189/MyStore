const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
   if (!message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`${message.author} Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın!`)).then(m => m.delete({timeout: 7000}))
let rol = message.mentions.roles.first();
if(!rol) return message.channel.send(new MessageEmbed().setColor('RED').setAuthor(message.author.username, message.author.avatarURL({dynamic: true})).setDescription(`Lütfen Bir Kayıtsız Rolü Belirtiniz.`))

const embed = new MessageEmbed()
.setColor('GREEN')
.setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
.setDescription(`Başarılı, Kayıtsız Rolü Başarıyla ${rol} olarak ayarlandı.`)
message.channel.send(embed)
db.set(`kayıtsızrole_${message.guild.id}`, rol.id)
}
exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: ['kayıtsızrol','kayıtsızrole','kayıtsız-role'],
  permLevel: 0 
};

exports.help = {
  name: 'kayıtsız-rol'
};