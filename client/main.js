import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import './main.html';

//collection of input entries
const Input = new Mongo.Collection('input');


//variables to indicate style states

bold_status = new ReactiveVar("");
italic_status = new ReactiveVar("");
underline_status = new ReactiveVar("");
no_style_status = new ReactiveVar("no font effects active")
color_status = new ReactiveVar("");

text_color = "#000000";


//templates


Template.styles.helpers({

  //displays the current status of text

  is_bold: function() {
    return bold_status.get();
  },

  is_italic() {
    return italic_status.get();
  },

  is_underline() {
    return underline_status.get();
  },

  what_color() {
    return color_status.get();
  },

  no_styles() {
    if (bold_status.get() == '' && italic_status.get() == '' && underline_status.get() == '' && color_status.get() == ''){
      return "no font effects active";
    }
  }

});

Template.styles.events({

  //button events to toggle style states
  'click #bold'(event, instance) {

    if (bold_status.get() == '') {
      bold_status.set('bold');
    }
    else if (bold_status.get() == 'bold') {
      bold_status.set('');
    }


    console.log("Bold: " + bold_status.get());
  },

  'click #italic'(event, instance) {

    if (italic_status.get() == '') {
      italic_status.set('italic');
    }
    else if (italic_status.get() == 'italic') {
      italic_status.set('');
    }

    console.log("Italic: " + italic_status.get());
  },

  'click #underline'(event, instance) {

    if (underline_status.get() == '') {
      underline_status.set('underline');
    }
    else if (underline_status.get() == 'underline') {
      underline_status.set('');
    }

    console.log("Underline: " + underline_status.get());
  },

  'click #black'(event, instance) {
    text_color = "#000000";
    color_status.set('');
    console.log("Color: black");
  },

  'click #red'(event, instance) {
    text_color = "#c0392b";
    color_status.set('red');
    console.log("Color: red");
  },

  'click #green'(event, instance) {
    text_color = "#2ecc71";
    color_status.set('green');
    console.log("Color: green");
  },

  'click #blue'(event, instance) {
    text_color = "#2980b9";
    color_status.set('blue');
    console.log("Color: blue");
  }
});




Template.text.helpers({
  entered_text() {
    return Input.find();
  }
});

Template.text.events({
  
  'keypress input': function (event, template) {
    if (event.which == 13 || event.which == 32) {

      console.log($('input').val());

      Input.insert({
        entry: $('input').val(),
        bold: bold_status.get(),
        italic: italic_status.get(),
        underline: underline_status.get(),
        color: text_color
      });

      //clear input box
      $('input').val('');
    }
  },

  'click #clear_btn': function (event, template) {
    //CONFIRMATION ALERT

    if (confirm('Are you sure you want to clear?')) {
      console.log("clearing collection");

      Input.find().forEach(function(doc){
        Input.remove(doc._id)
      });
    }
  },
});


