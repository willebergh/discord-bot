module.exports = pipelineHook = (req, res) => {

    const Discord = require("discord.js");
    const config = require("config");

    const { id, token } = config.get("webhooks.willebergh-io");
    const hook = new Discord.WebhookClient(id, token);

    const {
        object_kind,
        object_attributes,
        user,
        project,
        commit,
        builds
    } = req.body;

    pipelineEmoji = status => {
        if (status === "success") {
            return "<:pipeline_success:579334092982583296>";
        } else if (status === "failed") {
            return "<:pipeline_failed:579334153481224222>";
        } else {
            return "<:pipeline_else:579334188495405086>";
        }
    }

    firstLetterUp = string => {
        let firstLetter = string.charAt(0).toUpperCase();
        let rest = string.slice(1, string.length);
        return `${firstLetter}${rest}`
    }

    const stages = object_attributes.stages.map(stage => {

        const buildsPerStage = builds.filter(build => build.stage === stage).map(build => {
            return `${pipelineEmoji(build.status)} ${firstLetterUp(build.name)}: ${firstLetterUp(build.status)} \n`
        });

        const newField = {
            "name": firstLetterUp(stage),
            "value": buildsPerStage.toString().replace(",", ""),
            "inline": true
        };

        return newField
    });

    const embed = {
        "color": 14685718,
        "author": {
            "name": `${user.name}`,
            "url": `https://gitlab.dampgang.com/${user.username}`,
            "icon_url": `${user.avatar_url}`
        },
        "url": `${project.web_url}`,
        "title": `Pipeline update for ${project.path_with_namespace}`,
        "description": `Pipeline status: ${firstLetterUp(object_attributes.status)} ${pipelineEmoji(object_attributes.status)} \n`,
        "fields": stages

    };

    const RichEmbed = new Discord.RichEmbed(embed);

    hook.send(RichEmbed);

    res.status(200).json("ok");
}