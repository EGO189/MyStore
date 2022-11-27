const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const fetch = require('node-fetch');
require("moment-duration-format")

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Komutu Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};






client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`hgkanal_${member.guild.id}`) 
    if(!kanal || !kanal) return
    let sonuç = kanal - member.guild.memberCount
     let user = client.users.cache.get(member.id);
  let yetkilirole = db.fetch(`yetkilirole_${member.guild.id}`)
           if (!kanal) return;
 
          member.guild.channels.cache
        .get(kanal)
        .send(`${member}`)
  
  require("moment-duration-format");
    let kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = '**Şüpheli**'
if (kurulus > 1296000000) kontrol = '**Güvenli**'
  moment.locale("tr");
  const embed = new Discord.MessageEmbed()
    .setTitle(member.guild.name + ` Sunucusuna Hoş Geldin!`)
    .setDescription(`${member} **Bizde Seni Bekliyorduk..**
  \nSeninle Birlikte \`${member.guild.memberCount}\` Kişiyiz!
  \nKaydının yapılması için **sesli odaya** gelip ses vermen yeterli.
  \nSunucumuzdaki kaydını yapmak için <@&${yetkilirole}> bekliyordu.
  \nHesap Durumu ${moment(member.user.createdAt).format("**DD MMMM YYYY dddd (hh<:mm:723226315972673658>ss)**") } - ${kontrol}`)
  client.channels.cache.get(kanal).send(`<@&${yetkilirole}>`)
  client.channels.cache.get(kanal).send(embed)
  return
    })


client.login(ayarlar.token);      