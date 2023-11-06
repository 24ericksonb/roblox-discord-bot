![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/7c48eb63-fa40-41ce-9410-3282088db010)

# Roblox Discord Bot (Work in progress)

![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white) 

A Discord bot designed for Roblox's early recruiting server. 

Last updated: **Nov 4th, 2023**

## Description

`roblox-discord-bot` is a project aimed at streamlining the verification processes and other custom functionality in the offical Roblox Discord server. The bot is built using Node.js and TypeScript, and utilizes the Discord.js library for interacting with the Discord API.

## Commands

<img src="https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/2a94a698-97cc-4194-b03d-7d46d3cb140f" alt="Roblox" title="Roblox Bot" align="right" width="300"/>

### `/approve <member> <name>` (Admin only)

This command verifies specified members by:

1. Adding "Verified" role
2. Removing "Not Verified" role
3. Changing server name to full name
4. Direct messages the member about successful verification

<img src="https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/be9dd0ab-b237-4f5e-8365-43c833204bdd" alt="Roblox" title="Roblox Bot" align="right" width="300"/>

### `/reject <member>` (Admin only)

This command rejects the verfification of a specified member by:

1. Adding "Not Verified" role
2. Removing "Verified" role
3. Direct message the member about failed verification

### `/roll` (Everyone)

This command is used to test the bot's commands by rolling a random number between 1-100.

## Extra Features

<table>
<tr>
<td>

If `GOOGLE_FORM_UPDATES` is set to `1`, the bots status will be updated with the current amount of members waiting to be verified every set interval (see bottom picture). It uses Google Forms API to query the verification form and retrieves the current amount of responses. The verifier will have to delete the verification responses as they process them for this to work efficently. If `GOOGLE_FORM_UPDATES`is set to `0`, it will display a static message (see top picture).

</td>
<td width="300">

![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/53be0942-e6d0-4c35-80f0-e89e0a9d8788)

</td>
</tr>
</table>

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
    Replace all `XXXXXXX` with correct values.

    - `DISCORD_TOKEN` & `DISCORD_CLIENT_ID`: The Discord bot token and client ID which 
        - Can be found [here](https://discord.com/developers/applications)
    - `GUILD_ID`: The Discord server ID 
        - [Instructions](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=Obtaining%20Server%20IDs%20%2D%20Mobile%20App,name%20and%20select%20Copy%20ID.) to find server ID
    - `FORM_ID`: The verification Google Form id
        - Located in the URL: docs.google.com/forms/d/**\<FORM_ID\>**/edit
    - `GOOGLE_FORM_UPDATES`: Bot's status boolean
        - Refer to [Features](#extra-features) sections to see the difference.
    - `STATUS_UPDATE_IN_MINUTES`: The interval (in minutes) at which the status is updated
        - This only has an affect if `GOOGLE_FORM_UPDATES` is set to `1`

4. (_Optional_) Set up Google Cloud service account:

    If you would want live updates of how many users are currently waiting to be verified (ie `GOOGLE_FORM_UPDATES` is set to `1`), please set up a Google Cloud service account by follow these [instructions](https://developers.google.com/workspace/guides/create-credentials#create_a_service_account).

    An example of the format of the service account credential file is located in `example-google-credentials.json` (rename the file to `google-credentials.json`).

    **IMPORTANT:** Make sure to share Editor access of the verification form to your service account.

### Usage

- To start the bot (production use):

    ```bash
    npm start
    ```

- To start the bot in development mode (checks for file changes):

    ```bash
    npm run dev
    ```

- Compile and clean up `dist` directory of stale files:

    ```bash
    npm run build
    ```

- To lint the code:

    ```bash
    npm run lint
    ```

- To update slash command definitions (only call when updating definitions):

    ```bash
    npm run update
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

**Bryce Erickson** | CS @ Northeastern University

- GitHub: [24ericksonb](https://github.com/24ericksonb)
