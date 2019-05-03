const express = require("express");
const axios = require("axios");
const Discord = require('discord.js');
const config = require("config");

const app = express();
const client = new Discord.Client();

app.use("/", (req, res) => {
    res.send("Discord")
    axios.get("https://discordapp.com/api/users/@me/guilds", {
        headers: {
            token: "B2brnXCQKHeqOUKQEhBBR83eGSN27c"
        }
    })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
});



client.on("message", message => {
    if (message.content == "members") {
        message.channel.send(message.guild.members);
    } else {
        return
    }
})
client.login(config.get("bot_token"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));