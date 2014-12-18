Meteor.startup(function () {
	// Clears message colleciton on start-up
	Messages.remove({});
});

Meteor.methods({
  	addMessage: function (text) {
		// Make sure the user is logged in before inserting a message
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Messages.insert({
			text: text,
			createdAt: new Date(),
			owner: Meteor.userId(),
			username: Meteor.user().username
		});
  	},

	deleteMessage: function (MessageId) {
		Messages.remove(MessageId);
	},

	addFriend: function (friendName) {
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		Friends.insert({
			owner: Meteor.userId(),
			friendName: friendName
		});
		
	},
	deleteFriend: function (friendId) {
		Friends.remove(friendId);
	}
});