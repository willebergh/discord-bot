const config = require("config")
const prefix = config.get("prefix")

// COMMANDS
const test = require("./test")
const allsvenskan = require("./allsvenskan/")

const Command = (message, callback) => {
    const cmd = message.content.replace(`${prefix} `, "");

    if (cmd.startsWith("test")) {
        test(data => callback(data));
    }

    if (cmd.startsWith("as")) {
        if (cmd === "as") { allsvenskan.tabell(data => callback(data)) }
        else if (cmd === "as tabell") { allsvenskan.tabell(data => callback(data)) }
        else if (cmd === "as next match") { allsvenskan.upcomingMatches(data => callback(data)) }

    }
}

module.exports = Command