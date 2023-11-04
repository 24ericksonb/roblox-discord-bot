![example workflow](https://github.com/24ericksonb/roblox-discord-bot/actions/workflows/main.yml/badge.svg)

![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/4e30a17d-3774-4d54-b48e-82f923f11743)

# Roblox Discord Bot

![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) 

A Discord bot designed for early recruiting servers. 

Last updated: **Nov 4th, 2023**

## Description

`roblox-discord-bot` is a project aimed at streamlining the verification processes and other custom functionality in the offical Roblox Discord server. The bot is built using Node.js and TypeScript, and utilizes the Discord.js library for interacting with the Discord API.

## Commands

### `/approve <member> <name>` (Admin only)

This command verifies specified members by:

1. Adding "Verified" role
2. Removing "Not Verified" role
3. Changing server name to full name
4. Direct messages the member about successful verification

### `/reject <member>` (Admin only)

This command rejects the verfification of a specified member by:

1. Adding "Not Verified" role
2. Removing "Verified" role
3. Direct message the member about failed verification

### `/roll` (Everyone)

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
