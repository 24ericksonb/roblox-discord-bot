![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/7c48eb63-fa40-41ce-9410-3282088db010)

# Roblox Discord Bot (Work in progress)

![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

A Discord bot designed for Roblox's early recruiting server. 

Last updated: **Nov 13th, 2023**

## Description

`roblox-discord-bot` is a project aimed at streamlining the verification processes and other custom functionality in the offical Roblox Discord server. The bot is built using Node.js and TypeScript, and utilizes the Discord.js library for interacting with the Discord API.
Here's a more professional and standardized version of the GitHub markdown documentation for the commands:

## Admin Commands

### `/admin-help` (ephemeral)

Provides a comprehensive list of all available administrative commands and their functions.

**Usage:**
```
/admin-help
```

**Function:**
- Displays a message to the administrator with detailed information about each admin command.

---

### `/domains`

Displays the current list of email domains authorized for server member verification.

**Usage:**
```
/domains
```

**Function:**
- Sends a message listing all verified email domains.

---

### `/add-domain <domain>`

Adds a new email domain to the server's list of verified domains. Supports wildcard (`*`) for broader domain inclusion.

**Usage:**
```
/add-domain example.com
/add-domain *.org
```

**Function:**
- Registers a new email domain for verification purposes.

**Restrictions:**
- Domains already present on the list cannot be added again.
- The domain must be a valid format and adhere to a predefined regular expression pattern.

---

### `/remove-domain <domain>`

Removes an existing email domain from the server's list of verified domains.

**Usage:**
```
/remove-domain example.com
```

**Function:**
- Deletes an email domain from the verification list.

**Restrictions:**
- Only domains currently on the list can be removed.

---

## Member Commands

### `/help` (ephemeral)

Provides a list of available commands for server members along with their descriptions.

**Usage:**
```
/help
```

**Function:**
- Sends a message to the user with information about member commands.

---

### `/send-code <email>` (ephemeral)

Initiates the email verification process by sending a unique code to the specified email address.

**Usage:**
```
/send-code example@gmail.com
```

**Function:**
- Dispatches a verification code via email.

**Restrictions:**
- Each user is limited to one verification attempt, which expires after a specified duration.
- The email address must be valid and align with one of the approved domains.
- Users who have already verified cannot use this command.

---

### `/verify <code>` (ephemeral)

Completes the email verification process by verifying the code sent to the user's email.

**Usage:**
```
/verify 236189
```

**Function:**
- Assigns the "Verified" role to the user.
- Removes the "Not Verified" role.
- Records the verification event in a designated text channel.

**Restrictions:**
- The user must have an ongoing verification process.
- A set threshold of invalid attempts is allowed before the verification process is halted.
- The entered code must match the one sent to the user's email for successful verification.

## Extra Features

### Dynamic Bot Status

If `GOOGLE_FORM_UPDATES` is set to `1`, the bots status will be updated with the current amount of members waiting to be verified every set interval (see bottom picture). It uses Google Forms API to query the verification form and retrieves the current amount of responses. The verifier will have to delete the verification responses as they process them for this to work efficently. If `GOOGLE_FORM_UPDATES`is set to `0`, it will display a static message (see top picture).

<div align="center">
  <img src="https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/53be0942-e6d0-4c35-80f0-e89e0a9d8788" alt="Roblox" title="Roblox Bot" width="300"/>
</div>

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
        - Refer to "[Dynamic Bot Status](#dynamic-bot-status)" sections to see the difference.
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

- To sync slash command definitions with Discord:

    ```bash
    npm run sync
    ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Author

**Bryce Erickson** | CS @ Northeastern University

- GitHub: [24ericksonb](https://github.com/24ericksonb)
