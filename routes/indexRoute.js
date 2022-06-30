const express = require("express");
const router = express.Router();
const reminderController = require("../controller/reminder_controller");
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/login", (req, res) => {
  // res.render("auth/login");
  res.redirect('auth/login');
});


router.get("/register", (req, res) => {
  // res.render("auth/login");
  res.redirect('auth/register', {layout: './layout'});
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("auth/dashboard", {
    user: req.user,
    layout: './layout_withnav',
  });
});

// Case 2: User goes to localhost:3001/reminder  --> show a list of reminders
router.get("/reminders", ensureAuthenticated,reminderController.list);

// Case 3: User goes to localhost:3001/reminder/new  --> show a create a reminder page
router.get("/reminder/new", ensureAuthenticated,reminderController.new);

// Case 4: User sends new reminder data to us 
router.post("/reminder/", ensureAuthenticated,reminderController.create);

// Case 5: User wants to SEE an indivisual reminder
router.get("/reminder/:id", ensureAuthenticated,reminderController.listOne);

// Case 6: User wants to EDIT an individual reminder
router.get("/reminder/:id/edit", ensureAuthenticated,reminderController.edit);

// Case 7: User clicks the UPDATE BUTTON from case 6, expect their reminder to be updated
router.post("/reminder/update/:id", ensureAuthenticated,reminderController.update);

// Case 8: User clicks the DELETE BUTTON and we expect the reminder to be deleted
router.post("/reminder/delete/:id", ensureAuthenticated,reminderController.delete);


module.exports = router;
