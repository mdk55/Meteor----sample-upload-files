import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    Uploads = new FS.Collection ("uploads", {
    stores: [new FS.Store.FileSystem("Uploads", { path:"~/meteor_uploads"})]
    
});

Uploads.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});
    
    Meteor.publish("uploads", function () {
  console.log("publishing fileUploads");
  return Uploads.find();
});
    
});

