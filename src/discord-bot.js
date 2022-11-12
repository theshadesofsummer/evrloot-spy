import dotenv from 'dotenv';
dotenv.config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, Collection, IntentsBitField } from 'discord.js';

import { soulInfoCommand } from './commands/soulinfo.js'
import { soulInfoButton} from "./commands/buttons/soulInfoButton.js";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });
const commands = [
    soulInfoCommand
]
const buttonInteractions = [
    soulInfoButton
]

export async function setupDiscordBot() {
    await deployCommandsToServer();

    client.commands = getCollectionForCommands();

    client.once('ready', () => {
        console.log('Ready!');
    });

    client.on('interactionCreate', async interaction => {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                // await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isButton()) {
            console.log(interaction);

            try {
                await soulInfoButton.execute(interaction);
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    await client.login(process.env.EVRLOOT_BOT_TOKEN);
}

async function deployCommandsToServer() {
    const commandData = []
    for (const command of commands) {
        commandData.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.EVRLOOT_BOT_TOKEN);

    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.EVRLOOT_BOT_CLIENTID),
            { body: commandData },
        );

        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}

function getCollectionForCommands() {
    const collection = new Collection();

    for (const command of commands) {
        collection.set(command.data.name, command);
    }

    return collection;
}