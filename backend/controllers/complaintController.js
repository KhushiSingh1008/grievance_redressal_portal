const asyncHandler = require('express-async-handler');
const Complaint = require('../models/complaint');

const getComplaints = asyncHandler(async (req, res) => {

  const isAdmin = req.user.email === 'admin@issuechase.com'

  let complaints

  if (isAdmin) {
    complaints = await Complaint.find().populate('user', 'name email')
  } else {
    // USER VIEW: See only MY tickets
    complaints = await Complaint.find({ user: req.user.id })
  }

  res.status(200).json(complaints)
})

const createComplaint = asyncHandler(async (req, res) => {
  const { policyNumber, category, title, description } = req.body

  if (!policyNumber || !category || !title || !description) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  let assignedDept = 'General Support'
  let assignedPriority = 'Low'

  if (category === 'Premium Payment') {
    assignedDept = 'Finance Department'
    assignedPriority = 'High'
  } else if (category === 'Claim Issue') {
    assignedDept = 'Claims Department'
    assignedPriority = 'High'
  }
  else if (category === 'Policy Document') {
    assignedDept = 'Administrative Department'
    assignedPriority = 'Medium'
  }

  const complaint = await Complaint.create({
    user: req.user.id,
    policyNumber,
    category,
    title,
    description,
    department: assignedDept, 
    priority: assignedPriority, 
    status: 'Pending'
  })

  res.status(201).json(complaint)
})

const getComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).populate('user', 'name email')

  if (!complaint) {
    res.status(404)
    throw new Error('Complaint not found')
  }

  console.log("1. Who is logged in?", req.user.email)
  console.log("2. Is this the Admin email?", req.user.email === 'admin@issuechase.com')
  console.log("3. Who owns the ticket?", complaint.user ? complaint.user.email : 'Unknown User')

  const isAdmin = req.user.email === 'admin@issuechase.com'

  const isOwner = complaint.user && complaint.user._id.toString() === req.user.id

  if (!isOwner && !isAdmin) {
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json(complaint)
})

const updateComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)

  if (!complaint) {
    res.status(404)
    throw new Error('Complaint not found')
  }

  if (req.user.email !== 'admin@issuechase.com') {
    res.status(401)
    throw new Error('Not authorized')
  }

  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.status(200).json(updatedComplaint)
})

const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)

  if (!complaint) {
    res.status(404)
    throw new Error('Complaint not found')
  }

  const isAdmin = req.user.email === 'admin@issuechase.com'
  const isOwner = complaint.user.toString() === req.user.id

  if (!isAdmin && !isOwner) {
    res.status(401)
    throw new Error('Not authorized')
  }

  if (!isAdmin && isOwner && complaint.status !== 'Pending') {
    res.status(400)
    throw new Error('Cannot delete active ticket')
  }

  await complaint.deleteOne()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getComplaints,
  createComplaint,
  getComplaint,
  updateComplaint,
  deleteComplaint,
};