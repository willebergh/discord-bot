const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
    })
    client.user.setActivity("Förbannad")
});

// Create an event listener for messages
client.on('message', message => {
    // If the message is "ping"
    if (message.content === 'ping') {
        // Send "pong" to the same channel
        message.channel.send('erim');
    } else if (message.content === 'avatar') {
        // Send the user's avatar URL
        message.reply(message.author.avatarURL);
    }
});

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    receivedMessage.channel.send("Sug min balle " + receivedMessage.author.toString())

    if (receivedMessage.content.includes(client.user.toString())) {
        // Send acknowledgement message
        receivedMessage.channel.send("Message received from " +
            receivedMessage.author.toString() + ": " + receivedMessage.content)
    }
    if (receivedMessage.content.startsWith("!damp")) {
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[1] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(2) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    if (primaryCommand == "help") {
        helpCommand(arguments, receivedMessage)
    } else if (primaryCommand == "gayCheck") {
        gayCheckCommand(arguments, receivedMessage)
    } else {
        receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
    }
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        receivedMessage.channel.send("It looks like you might need help with " + arguments)
    } else {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
    }
}

function gayCheckCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (arguments == "denniz") {
            receivedMessage.channel.send("That's true.")
        } else {
            receivedMessage.channel.send("The gay one is Denniz")
        }
    } else {
        receivedMessage.channel.send("The gay one is Denniz")
    }
}

client.login('NTczNDY4MDI3MDY5MjY3OTY5.XMrnEA.QztwWQKDWio4JC7SmCZ-WygTawU');