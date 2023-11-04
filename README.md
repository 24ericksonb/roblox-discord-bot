
# Roblox Discord Bot

A Discord bot designed for early recruiting servers.

## Description

`roblox-discord-bot` is a project aimed at verification processes and enhancing the interaction in the offical Roblox Discord server. The bot is built using Node.js and TypeScript, and utilizes the Discord.js library for interacting with the Discord API.

## Commands

### Approve: `/approve <member> <name>` (Admin only)

This command verifies specified members by:

1. Adding "Verified" role
2. Removing "Not Verified" role
3. Changing server name to full name
4. Direct messages the member about successful verification

### Reject: `/reject <member>` (Admin only)

This command rejects the verfification of a specified member by:

1. Adding "Not Verified" role
2. Removing "Verified" role
3. Direct message the member about failed verification

### Roll: `/roll` (Everyone)

This command is used to test the bot's commands by rolling a random number between 1-100.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/24ericksonb/roblox-discord-bot.git
    cd roblox-discord-bot
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up `.env` file:
    ```bash
    cp .example-env .env
    ```
    Replace all "XXXXXXX" with correct values.

    - DISCORD_TOKEN & DISCORD_CLIENT_ID: The Discord bot token and client ID which can be found [here](https://discord.com/developers/applications)!
    - GUILD_ID: The Discord server ID ([instructions](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=Obtaining%20Server%20IDs%20%2D%20Mobile%20App,name%20and%20select%20Copy%20ID.))

### Usage

- To start the bot (production use):

    ```bash
    npm start
    ```

- To start the bot in development mode:

    ```bash
    npm run dev
    ```

    Automatically recompiles code with file changes.

- To lint the code:

    ```bash
    npm run lint
    ```

- To update slash command definitions:

    ```bash
    npm run update
    ```

    Only run this when updating the definitions as Discord rate limits this API call.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

**Bryce Erickson**

- Email: berickson@roblox.com
- GitHub: [24ericksonb](https://github.com/24ericksonb)
