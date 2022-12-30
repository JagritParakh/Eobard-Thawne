# Eobard Thawne

### A simple multipurpose discord bot built in Discord.JS V14.




---
# Installation:
### First of all, clone the repository into a directory by doing `git clone https://github.com/TheCoderSimp/Eobard-Thawne.git .` and run `npm install`
### After everything is installed, continue with the following steps
<br> </br>
### Rename example.config.json to config.json. This is what it should look like
```json
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "botId": "",
    "tenorId": "",    
    "verifyRole": "", 
    "mongo": "",
    "openAIKey": "",
    "memeAPI": "",
}
```
### Fill out all the requirements
<br> </br>
## To Fill out the `mongo` in the json, do the following steps

### Go to the [MongoDB website](https://www.mongodb.com/) and make a account
### After doing so, make a new cluster. Make a new username and a password as well.
### After making a cluster, username and password, go to `Database` and click on `Connect`. Then click on the 2nd option, `Connect your application to your cluster using MongoDB's native drivers`.
### Copy the connection string and replace the `<password>` section of the string with the password you used in the cluster earlier
### Finally paste it into the `config.json` and it should be all ready to go
<br> </br>
## To fill out the `openAIKey` in the json, do the following steps

### Go to the [OpenAI website](https://beta.openai.com/) and make an account
### Then click on the top right corner and click on `View API Keys` on the dropdown
### Click on `Create a new secret key`
### Copy the key and paste it 
<br> </br>
## To Fill out the `memeAPI` in the json, do the following steps

### Join [memer-api's Discord Server](https://discord.gg/tjTZEXtUdH)
### Go to `#bot_commands` channel and type in m!token
### A bot will dm you the token
### Copy and paste it into the `config.json`
---

# Optional Commands

### The `gif` and the `verify` commands are optional. If you wish to use them, follow the instructions.

<br> </br>

## Verify Command
### How is this command works that every time its executed, it checks if a targeted user has a certain role or not. If he does, all good, but if he doesn't, it gives the role to the user. This is ideally used to verify new users into the server.
### To use this command, turn on developer mode on discord and get the id of the role of your wish. Then in `config.json` add the role id.

```json
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "tenorId": "",
    "verifyRole": "" //Add the role id here
}
```

## Gif Command
### This is a very simple command, it will return a gif whenever executed. The gif is random by default but the user can specify a category.
### Firstly, go to the tenor docs to make an API key. Click [here](https://developers.google.com/tenor/guides/quickstart#setup)
### Make sure you're logged in with your google account and click on `Get a Tenor API Key`
### Click on `Create a new project` and name your project. It can take some time to load. When its done, click on `Show Key` and copy it. Dont share this with other people.
### Now just go to `config.json` and add the API key.
```json
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "tenorId": "", //Add tenor id here
    "verifyRole": "" 
}
```

---

# More and more features will by added by me in the future. Those will include music commands, modals, games, etc.