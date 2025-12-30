const express = require('express');
const router = express.Router();
const { getComplaints, createComplaint , getComplaint } = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');

// console.log("Is protect a function?", typeof protect);
// console.log("Is getComplaints a function?", typeof getComplaints);
// console.log("Is createComplaint a function?", typeof createComplaint);

router.route('/')
  .get(protect, getComplaints)    
  .post(protect, createComplaint); 

router.route('/:id')
  .get(protect, getComplaint);

module.exports = router;