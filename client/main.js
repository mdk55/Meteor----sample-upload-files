import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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

Meteor.subscribe("uploads");

Template.d8dbankpanel.helpers({
    
   uploads:function(){
       
       return Uploads.find();
   } 
});

Template.d8dbankpanel.events({
    
    'click #deleteFileButton ': function (event) {
        console.log("deleteFile button ", this);
        Uploads.remove({_id:this._id});
        
      },
    
   'change .fileInput': function (event, template){       
       FS.Utility.eachFile(event,function(file){
           var yourFile = new FS.File(file);           
            Uploads.insert(yourFile, function (err, fileObj) {
        console.log("callback for the insert, err: ", err);
        if (!err) {
          console.log("inserted without error");
        }
        else {
          console.log("there was an error", err);
        }
      });
       });
   }    
});