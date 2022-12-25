const { Events } = require('discord.js')
const { Configuration, OpenAIApi } = require("openai");
const { openAIKey, botId } = require('../config.json')

module.exports = {
    name: Events.MessageCreate,
    async execute(message){
        if(message.author.bot) return
        let args
        let msgPrompt
        let send = false
        const mention = `<@${botId}>`
        if(message.content.startsWith(mention)){
            args = message.content.slice(mention.length).trim().split(/ +/g);
            msgPrompt = args.join(' ')
            send = true
        }
        if(send){
            const configuration = new Configuration({
                apiKey: openAIKey,
              });
              const openai = new OpenAIApi(configuration);
              
              const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\nYou: ${msgPrompt}\nMarv:`,
                temperature: 0.5,
                max_tokens: 60,
                top_p: 0.3,
                frequency_penalty: 0.5,
                presence_penalty: 0.0,
              });
              
              const respArray = response.data.choices[0].text.split(" ")
              respArray.shift()
              const resp = respArray.join(' ')
              message.reply(resp)
    }
}
}