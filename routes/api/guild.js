const express = require("express");
const router = express.Router();
const Discord = require("discord.js");
const config = require("config");

router.get("/", (req, res) => {
    const client = new Discord.Client();

    client.on("ready", () => {

        let OUTPUT = []

        client.guilds.map(guild => {
            OUTPUT = [{ name: guild.name }]
        })

        console.log(OUTPUT);
        res.json(OUTPUT);
    })

    client.login(config.get("bot_token"));

})

module.exports = router