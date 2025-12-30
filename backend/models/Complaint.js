const mongoose = require('mongoose')

const complaintSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  policyNumber: {
    type: String,
    required: [true, 'Please add a policy number'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Claim Issue', 'Premium Payment', 'Policy Document', 'Other'],
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },

  department: {
    type: String,
    required: true,
    default: 'General Support' 
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Resolved'], 
    default: 'Pending',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low',
  },
  adminResponse: {
    type: String, 
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('Complaint', complaintSchema)