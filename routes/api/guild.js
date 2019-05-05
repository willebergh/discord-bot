const express = require("express");
const router = express.Router();
const Discord = require("discord.js");
const config = require("config");

router.get("/:id", (req, res) => {
    const client = new Discord.Client();
    const id = req.params.id;

    client.on("ready", () => {
        client.guilds.map(guild => {
            if (guild.id == id) {

                let output = {
                    memberCount: 0,
                    members: []
                }

                guild.members.map(member => {
                    if (!member.user.bot) {
                        output.memberCount++;
                        output.members.push({
                            member: {
                                id: member.user.id,
                                nick: member.user.nick,
                                username: member.user.username,
                                discriminator: member.user.discriminator,
                                avatar: member.user.avatar,
                                roles: member.roles.map(role => {
                                    return role.name
                                })
                            }
                        })
                    }
                })

                console.log(output);
                res.json(output);
            }
        })
    })

    client.login(config.get("bot_token"));

})

module.exports = router