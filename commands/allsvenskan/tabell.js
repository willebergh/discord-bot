const Discord = require("discord.js");
const axios = require("axios");

const emblem = require("./utils/emblem");

module.exports = tabell = (callback) => {
    axios.get("https://www.scorebat.com/api/competition/2/sweden-allsvenskan/")
        .then(res => {

            const textColor = row => {
                return row === 1 ? "green"
                    : row === 14 ? "yellow"
                        : row === 15 ? "red"
                            : row === 16 ? "red"
                                : "white";
            }

            const teams = res.data.response.standings.rows.map(team => {
                return `${team.row}. ${emblem(team.team)} ${team.team}`;
            }).toString().split(",").join("\n");

            const stats = res.data.response.standings.rows.map(stat => {
                var string = `${stat.p}, ${stat.w}, ${stat.d}, ${stat.l}, ${stat.pnt} ${emblem(stat.team)}`;
                return string.split(",").join(".")
            }).toString().split(",").join("\n").split(".").join(",");

            const embed = {
                "color": 770068,
                "timestamp": Date(),
                "author": {
                    "name": "Allsvenskan - Tabell",
                    "icon_url": "https://i.imgur.com/gpC4fhP.png"
                },
                "fields": [
                    {
                        "name": "Teams",
                        "value": teams,
                        "inline": true
                    },
                    {
                        "name": "P, W, D, L, Pnt",
                        "value": stats,
                        "inline": true
                    }
                ]
            }

            const RichEmbed = new Discord.RichEmbed(embed);

            callback(RichEmbed);
        })
}