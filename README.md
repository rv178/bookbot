<div align="center">
	<img src="https://media.discordapp.net/attachments/948141108402225184/948890934840528937/Untitled_design.png" alt=bookbot height=20% width=20% />
	<p align="center">
		<a href="https://buymeacoffee.com/bookbot">
			<img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt=buymeacoffee>
		</a>
		<a href="https://discord.gg/zxrrTEDkMg">
			<img src="https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt=discord>
		</a>
	</p>
</div>

# BookBot

Verified Discord bot which uses the Google Books API to show info about books.

## Commands

Available commands are listed at [https://rv178.github.io/bookbot/](https://rv178.github.io/bookbot/).

## Support

- Our [Discord](https://discord.gg/zxrrTEDkMg) server.
- Or create an [issue](https://github.com/rv178/bookbot/issues/new/choose).

## Installation

### Dependencies

Install these by visiting their websites and running their platform-specific installers.

- NodeJS (v16.9.0 or higher)
- Typescript compiler
- MongoDB
- Docker Compose\*

An asterik (\*) indicates optional dependencies.

Install JavaScript dependencies with `npm install`.

### Discord bot

Required scopes:

- `bot`
- `applications.commands`

Required bot permissions:

- Text permissions:
  - Send messages
  - Embed Links
  - Attach Files
  - Read Message History
  - Use External Emoji
  - Add Reactions

### Environment variables

An example configuration file can be found in the [sample.env](./sample.env) file.
Copy and rename this file to `.env` and put your bot tokens, etc. inside.

## Running

### Development

```
tsc -w
nodemon dist/index.js
```

### Production

```
yarn install
yarn build
node dist/index.js
```

or (obviously needs the optional dependency Docker Compose)

```
docker-compose up
```
