<p align=center>
	<img src="https://media.discordapp.net/attachments/948141108402225184/948890934840528937/Untitled_design.png" alt=bookbot height=20% width=20%>
</p>

# BookBot

Discord bot which uses the Google Books API to show info about books.

## Commands

See the [website](https://rv178.github.io/bookbot/).

## Dependencies

-   `NodeJS (v16.9.0 or higher)`
-   `MongoDB`
-   `Docker Compose (optional, for docker support)`

## Running

```
npm i
npm start
```

or do

```
node .
```

You can also run bookbot in test mode for development (calls nodemon instead of node). Also set the MODE in .env to TEST for per-guild slash commands (which is faster).

```
npm test
```

-   An example configuration file can be found in the [sample.env](./sample.env) file.

-   Copy this file to .env and put your bot token inside.

## Running with docker

```
docker-compose up
```

## Regarding environment variables

-   **`TOKEN`** is the bot token.
-   **`MONGO`** is your Mongo database url.
-   **`ERRORLOG`** is the webhook url for sending errors to a channel.
-   **`UPTIMELOG`** is the webhook url for sending uptime info to a channel.
-   **`REPORTLOG`** is the webhook url for sending user bug/feature reports to a channel.
-   **`MODE`** is the mode the bot can run in. This can be `PROD`/`TEST`. Used for setting up slash commands.
-   **`GUILD_ID`** is the server ID of your testing server. (optional, only required if `MODE` is set to `TEST`).

## Support

-   Our [Discord](https://discord.gg/zxrrTEDkMg) server.
-   Or create an [issue](https://github.com/rv178/bookbot/issues/new/choose).
