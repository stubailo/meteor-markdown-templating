if (Meteor.isClient) {
  Meteor.setInterval(function () {
    Session.set("time", new Date());
  }, 1000);

  Template.hello.helpers({
    currentTime: function () {
      return moment(Session.get("time")).format("hh:mm:ss a");
    }
  });

  Meteor.startup(function () {
    console.log(Blaze.toHTML(Template.markdownBody));
  });
}