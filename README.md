# Eobard Thawne

### A simple multipurpose discord bot built in Discord.JS V14.




---
# Installation:
### First of all, clone the repository into a directory and run `npm install`
### After everything is installed, continue with the following steps
<br> </br>
### Rename example.config.json to config.json. This is what it should look like
```json
{
    "token": "",
    "clientId": "",
    "guildId": "",
    "tenorId": "",   //Optional
    "verifyRole": "" //Optional
}
```
### Fill out all the +requirements
<br> </br>

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

# More and more features will by added by me in the future. Those will include economy commands, modals, games, etc.