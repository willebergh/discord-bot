const Discord = require("discord.js");
const axios = require("axios");
const moment = require("moment");

const emblem = require("./utils/emblem");

module.exports = upcomingMatches = (callback) => {
    axios.get("https://www.scorebat.com/api/competition/2/sweden-allsvenskan/")
        .then(res => {

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            const dates = res.data.response.fixtures.map(match => {
                return match.date.toString().substring(0, 10)
            }).filter(onlyUnique);

            const fieldsArray = []

            const filter = (date, index) => {
                const matches = res.data.response.fixtures.filter(x => x.date.startsWith(date))
                const map = matches.map(match => {

                    const kickOff = match.date.substring(11, 16);

                    const isToday_timeLeft = date => {
                        if (moment(date).diff(moment().clone().startOf("day"), "days") === 0) {
                            return ` - Starts ${moment().to(date)}`
                        } else {
                            return ""
                        }
                    }

                    return (`${kickOff} | ${emblem(match.side1)} ${match.side1} - ${match.side2} ${emblem(match.side2)}${isToday_timeLeft(match.date)}`)
                }).toString().split(",").join("\n");

                const displayDate = moment(date, "YYYYMMDD").calendar(null, {
                    lastDay: '[Yesterday]',
                    sameDay: '[Today]',
                    nextDay: '[Tomorrow]',
                    lastWeek: '[Last] dddd',
                    nextWeek: "[On] dddd",
                    sameElse: 'L'
                });

                const displayTime = time => {
                    moment().to(time)
                }

                fieldsArray.push({
                    "name": `${displayDate}`,
                    "value": `${map}\n\u200b`
                })
            }
            dates.forEach(filter)

            const embed = {
                "color": 770068,
                "timestamp": Date(),
                "author": {
                    "name": "Allsvenskan - Upcoming Matches",
                    "icon_url": "https://i.imgur.com/gpC4fhP.png"
                },
                "fields": fieldsArray
            }
            const RichEmbed = new Discord.RichEmbed(embed);
            callback(RichEmbed);

        });
}