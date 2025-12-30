const asyncHandler = require('express-async-handler');
const Complaint = require('../models/complaint');

const getComplaints = asyncHandler(async (req,res) =>{
    if (req.user.role === 'admin'){
        const complaints = await Complaint.find().populate('user','name','email');
        res.status(200).json(complaints);
    }
    else{
        const complaints = await Complaint.find({ user: req.user.id });
        res.status(200).json(complaints);
    }
});

const createComplaint = asyncHandler(async (req, res) => {
  const { title, policyNumber, category, description } = req.body;

  if (!title || !policyNumber || !category || !description) {
    res.status(400);
    throw new Error('All fields required!');
  }

  const complaint = await Complaint.create({
    user: req.user.id, 
    title,
    policyNumber,
    category,
    description,
    status: 'Pending'
  });

  res.status(201).json(complaint);
});

const getComplaint = asyncHandler(async(req,res) =>{
  const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');

  if(!complaint){
    res.status(404);
    throw new Error("Complaint not found");
  }

  if ( complaint.user._id.toString() !== req.user.id && req.user.role !== 'admin'){
    res.status(401)
    throw new Error ("Not authorized")
  }

  res.status(200).json(complaint);

});

module.exports = {
  getComplaints,
  createComplaint,
  getComplaint,
};