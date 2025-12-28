const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

console.log("Is protect a function?", typeof protect);
console.log("Is getComplaints a function?", typeof getComplaints);
console.log("Is createComplaint a function?", typeof createComplaint);

router.route('/')
  .get(protect, getComplaints)    
  .post(protect, createComplaint); 

module.exports = router;