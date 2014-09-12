if (Meteor.isClient) {
  Meteor.setInterval(function () {
    Session.set("time", new Date());
  }, 1000);

  Template.hello.helpers({
    currentTime: function () {
      return Session.get("time");
    }
  });
}