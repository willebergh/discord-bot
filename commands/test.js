const Discord = require("discord.js");
const axios = require("axios");
const moment = require("moment")

module.exports = test = (callback) => {

    const dateTest = string => {
        const year = string.substring(0, 4)
        const month = string.substring(6, 7)
        const day = string.substring(8, 10)
        const hour = string.substring(11, 13)
        const minutes = string.substring(14, 16)
        const seconds = string.substring(17, 19)

        var newDate = new Date()
        newDate.setFullYear(year)
        newDate.setMonth(month - 1)
        newDate.setDate(day)
        newDate.setHours(hour)
        newDate.setMinutes(minutes)
        newDate.setSeconds(seconds)

        return moment("20010911").format("dddd, MMMM Do")
    }


    //const msg = moment().startOf('day').fromNow();
    const date = new Date()
    date.setDate(29)

    //const msg = moment().add(6, 'days').calendar()
    //const msg = moment("20010911", "YYYYMMDD").fromNow(); // 7 years ago
    const msg = `${moment("20190523").format("dddd, MMMM Do")} ${moment("20190523", "YYYY-MM-DD").fromNow()}`
    const calendar = moment("2019-05-20", "YYYYMMDD").calendar(null, {
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        lastWeek: '[Last] dddd',
        nextWeek: "[On] dddd",
        sameElse: 'L'
    })


    const timeLeft = moment().to("2019-05-22 16:00")

    var a = moment("2019-05-22");
    var today = moment()
    a.diff(today, 'days') // 1

    const some = moment("2019-05-21").diff(moment().clone().startOf("day"), "days")

    callback(some);
}