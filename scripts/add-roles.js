const { Client, GatewayIntentBits } = require('discord.js');
const universitiesData = require('../universities.json');
const fs = require("node:fs");
const configFile = fs.readFileSync("./config.json", "utf8");
const config = JSON.parse(configFile);

const token = config.token;
const guildId = config.guildId;
const defaultUniRole = config.defaultUniRole;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    const roleNames = Object.values(universitiesData);
    roleNames.push(defaultUniRole);

    const guild = client.guilds.cache.get(guildId);

    const roleExists = (roleName) => {
        return guild.roles.cache.some(role => role.name === roleName);
    };

    let addedCounter = 0;
    let skippedCounter = 0;

    roleNames.forEach(roleName => {
        if (!roleExists(roleName)) {
            try {
                guild.roles.create({
                    name: roleName,
                    reason: 'Adding roles in bulk',
                })
                addedCounter += 1
            } catch (error) {
                console.log(`Error creating role ${roleName}!`)
            }
        } else {
            skippedCounter += 1;
        }
    });

    console.log(`Added ${addedCounter} new roles to the server.`)
    console.log(`Skipped adding ${skippedCounter} new roles to the server.\n`)

    client.destroy();
});

client.login(token);
