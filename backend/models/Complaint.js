// backend/models/Complaint.js
const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Title'],
    },
    policyNumber: {
      type: String,
      required: [true, 'Enter a valid policy number'], 
    },
    category: {
      type: String,
      required: [true, 'Specify the issue'],
      enum: [
        'Claim Issue', 
        'Premium Payment', 
        'Policy Document', 
        'Update Personal Details', 
        'Other'
      ],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);