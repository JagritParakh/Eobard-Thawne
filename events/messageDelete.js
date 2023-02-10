const { AuditLogEvent,Events } = require('discord.js')
module.exports = {
    name: Events.MessageDelete,
    async execute(message){
    if (!message.guild) return;
	if(message.author.bot) return // Ignore bot messages
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: AuditLogEvent.MessageDelete,
	});
	const deletionLog = fetchedLogs.entries.first();
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const date = Date.now()
	const { executor, target } = deletionLog;
	console.log(target.id + "\n" + executor.tag);

	const snipe = require("../schemas/snipeSchema")
	let data = await snipe.findOne({channelId:message.channel.id})
	if(!data){
		let newdata = new snipe({
			channelId: message.channel.id,
			message: message.content,
			author: message.author.tag,
			avatar: message.author.displayAvatarURL(),
			time: Math.floor(date/1000)
		})
		return await newdata.save()
	}

	await snipe.findOneAndUpdate({
		channelId: message.channel.id,
		message: message.content,
		author: message.author.tag,
		avatar: message.author.displayAvatarURL(),
		time: Math.floor(date/1000)
	})
	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	} else {
		console.log(`A message by ${message.author.tag} was deleted by themselves`);
	}
	console.log("Content: ", message.content);
    }
}
