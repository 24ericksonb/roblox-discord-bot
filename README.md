![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/7c48eb63-fa40-41ce-9410-3282088db010)

# Roblox Discord Bot

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

### `/domains`

Displays the current list of email domains authorized for server member verification.

**Usage:**
```
/domains
```

**Function:**
- Sends a message listing all verified email domains.

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

### `/blacklist`

Displays the current list of emails that are blacklisted for verification.

**Usage:**
```
/blacklist
```

**Function:**
- Sends a message listing all blacklisted emails.

### `/add-blacklist <email>`

Adds a new email to the server's blacklist.

**Usage:**
```
/add-blacklist example@gmail.com
```

**Function:**
- Adds a new email to the blacklist.
- Blocks anyone attempting to use this email for verification.

**Restrictions:**
- Emails already present on the list cannot be added again.
- The email must be a valid format and adhere to a predefined regular expression pattern.

### `/remove-blacklist <email>`

Removes an existing email from the server's blacklist.

**Usage:**
```
/remove-blacklist example@gmail.com
```

**Function:**
- Deletes an email from the  blacklist.

**Restrictions:**
- Only domains currently on the list can be removed.

## Member Commands

### `/help` (ephemeral)

Provides a list of available commands for server members along with their descriptions.

**Usage:**
```
/help
```

**Function:**
- Sends a message to the user with information about member commands.

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

**Example Email:**
![image](https://github.com/24ericksonb/roblox-discord-bot/assets/72327129/03fb332a-261d-4810-95fb-a29132330bbc)

### `/verify <code>` (ephemeral)

Completes the email verification process by verifying the code sent to the user's email.

**Usage:**
```
/verify 236189
```

**Function:**
- Assigns the `Verified` role to the user.
- Removes the `Not Verified` role.
- Records the verification event in a designated text channel.

**Restrictions:**
- The user must have an ongoing verification process.
- A set threshold of invalid attempts is allowed before the verification process is halted.
- The entered code must match the one sent to the user's email for successful verification.

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

3. Set up `config.json` file:
    ```bash
    cp config-example.json config.json
    ```
    ```json
    {
        "token": "REDACTED",
        "clientId": "REDACTED",
        "guildId": "REDACTED",
        "verifiedLogChannel": "REDACTED",
        "emailAddress": "REDACTED",
        "emailPassword": "REDACTED",
        "pendingExpirationInMinutes": 10,
        "maxAttempts": 3
    }
    ```

    Replace all `REDACTED` with correct values.

    - `token`: The Discord bot token (can be found [here](https://discord.com/developers/applications)) 
    - `clientId`: The client ID (can be found [here](https://discord.com/developers/applications))
    - `guildId`: The guild ID (instructions [here](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-#:~:text=Obtaining%20Server%20IDs%20%2D%20Mobile%20App,name%20and%20select%20Copy%20ID.))
    - `verifiedLogChannel`: The text channel where verification details will be logged (instructions [here](https://en.wikipedia.org/wiki/Template:Discord_channel#:~:text=To%20get%20the%20channel%2Fserver,to%20get%20the%20guild%20ID.))
    - `emailAddress`: The Gmail address that will send the verification codes
    - `emailPassword`: The Gmail app password (instructions [here](https://support.google.com/mail/answer/185833?hl=en))
    - `pendingExpirationInMinutes`: The expiration time in minutes of verification code
    - `maxAttempts`: The maximum of invalid code attempts before the verification process is halted

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
