const { Events, ActivityType} = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		const activities = [
			{ name: "with the timeline", type: ActivityType.Playing },
			{ name: "your every single step", type: ActivityType.Watching },
			{ name: "a race with Barry", type: ActivityType.Competing},
			{ name: `"It was me Barry" monologue 🔥`, type: ActivityType.Listening}
		]
		let i = 1
		setInterval(() => {
			if(i >= activities.length) i = 0
			client.user.setActivity(activities[i])
			i++;
		  }, 5000);
		client.user.setStatus("dnd")
		console.log("Bot has logged in");
	},
};
