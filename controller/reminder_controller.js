let database = require("../database");
let id=1; // increment id number when the user create new post

let remindersController = {

  // A function to list all reminders
  list: (req, res) => {
    res.render("reminder/index", 
    { 
      reminders: database.cindy.reminders,
      layout: './layout_withnav', 
    });
  },

  // A function to create a new reminder
  new: (req, res) => {
    res.render("reminder/create",
    {layout: './layout_withnav'},
    );
  },

  // A function to display one reminder given specific id (which is embeded in URI)
  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", 
      { 
        reminderItem: searchResult,
        layout: './layout_withnav'
      });
    } else {
      res.render("reminder/index", 
      { 
        reminders: database.cindy.reminders,
        layout: './layout_withnav' 
      });
    }
  },

  // A function to add new item to database, and redirect URI 
  create: (req, res) => {
    let reminder = {
      id: id++,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  // A function to redirect to the edit page
  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", 
    { 
      reminderItem: searchResult,
      layout: './layout_withnav'
    });
  },

  // A function to modify/update the database.js from user input
  update: (req, res) => {
    let reminderToFind = Number(req.params.id);
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    searchResult = {
      id: reminderToFind,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed === "true",
    };
    // update db
    for(let i=0; i<database.cindy.reminders.length; i++) {
      if(database.cindy.reminders[i].id === reminderToFind){
        database.cindy.reminders[i] = searchResult;
        break;
      }
    }
    res.render("reminder/update", 
    { 
      reminderItem: searchResult,
      layout: './layout_withnav' 
    });
  },

  // A function to delete a reminder
  delete: (req, res) => {
    let reminderToFind = Number(req.params.id);
    for(let i=0; i<database.cindy.reminders.length; i++) {
      if(database.cindy.reminders[i].id === reminderToFind){
        database.cindy.reminders.splice(i,1);
      }
    }
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
