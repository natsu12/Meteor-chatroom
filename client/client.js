Meteor.subscribe("messages");
Meteor.subscribe("friends");
Meteor.subscribe("users");

Template.body.helpers({
	messages: function () {
		return Messages.find({}, {sort: {createdAt: 1}});
	},
	friends: function () {
		return Friends.find({owner: Meteor.userId()});
	},
	errorMessage: function() {
    	return Session.get('messageSubmitErrors');
  	},
	errorFriend: function() {
		return Session.get('addFriendErrors');
	}
});

Template.body.events({
	"submit .new-message": function (event) {
		// This function is called when the new message form is submitted
		var text = event.target.text.value;

		// var errors = {};
		if (! text) {
			Session.set('messageSubmitErrors', "Please write some content");
			return false;
    	}



		Meteor.call("addMessage", text);
		// Clear form
		event.target.text.value = "";
		// Scroll at newest message
		var $chat = $('#chat-messages');
		$chat.animate({scrollTop: $chat[0].scrollHeight}, 200);

		Session.set('messageSubmitErrors', "");

		// Prevent default form submit
		return false;
	},
	"submit .new-friend": function (event) {
		var friendName = event.target.text.value;

		if (! friendName) {
			Session.set('addFriendErrors', "Please write a username");
			return false;
    	}

    	if (Friends.findOne({owner: Meteor.userId(), friendName: friendName})) {
			Session.set('addFriendErrors', "The friend has existed");
			return false;
		}

		if (friendName == Meteor.user().username) {
			Session.set('addFriendErrors', "Can not add yourself");
			return false;
		}

		if (Meteor.users.findOne({username: friendName})) {
			Meteor.call("addFriend", friendName);
			event.target.text.value = "";
			Session.set('addFriendErrors', "");
		} else {
			Session.set('addFriendErrors', "Can not find User");
		}

		

		return false;
	}
});

Template.friend.events({
	"click .delete": function () {
  		Meteor.call("deleteFriend", this._id);
	}
});

Accounts.ui.config({
	passwordSignupFields: "USERNAME_ONLY"
});