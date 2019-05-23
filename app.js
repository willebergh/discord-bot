const express = require("express");
const axios = require("axios");
const Discord = require('discord.js');
const config = require("config");

const app = express();
const client = new Discord.Client();

const prefix = config.get("prefix")
const Command = require("./commands/");

app.use(express.json());

// API & WEBHOOKS
app.use("/api/guild", require("./routes/api/guild"));
app.use("/api/webhooks/gitlab", require("./routes/api/webhooks/gitlab/"));

client.on("message", message => {
    if (message.content.startsWith(prefix)) {
        console.log(`[EXEC] Member ${message.author.username}(${message.author.id}) issued command: ${message.content}`);
        Command(message, data => message.channel.send(data))
    } else {
        return null
    }
});

client.login(config.get("bot_token"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));