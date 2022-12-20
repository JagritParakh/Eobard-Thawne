const { AuditLogEvent,Events } = require('discord.js')
module.exports = {
    name: Events.MessageDelete,
    async execute(message){
    if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: AuditLogEvent.MessageDelete,
	});
	const deletionLog = fetchedLogs.entries.first();
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
	const date = Date.now()
	const { executor, target } = deletionLog;
	console.log(target.id + "\n" + executor.tag);

	if (target.id === message.author.id) {
		console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
	} else {
		console.log(`A message by ${message.author.tag} was deleted by themselves`);
	}
	console.log(message.content);
    }
}