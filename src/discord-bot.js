import dotenv from 'dotenv';
dotenv.config();

import { REST } from 'discord.js';
import { Routes } from 'discord-api-types/v9';
import { Client, Collection, IntentsBitField } from 'discord.js';

import { soulInfoCommand } from './commands/soul-info.js'
import { soulInfoSelectMenu} from "./commands/select-menu/soul-info-select-menu.js";

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });
const commands = [
    soulInfoCommand,
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
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        if (interaction.isSelectMenu()) {
            try {
                await soulInfoSelectMenu.execute(interaction)
            }
           catch (error) {
                console.log(error);
                await interaction.reply({ content: 'There was an error while fetching the soul!', ephemeral: true });
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