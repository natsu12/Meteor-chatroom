Meteor.publish('messages', function() {
 	return Messages.find();
});

Meteor.publish('friends', function() {
	return Friends.find();
});

Meteor.publish('users', function() {
	return Meteor.users.find({}, {fields: {username: 1}});
})