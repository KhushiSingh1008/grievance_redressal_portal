import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

function NewComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    policyNumber: '',
    category: '',
    title: '',
    description: '',
  });

  const { policyNumber, category, title, description } = formData;

  const categories = [
    'Claim Issue',
    'Premium Payment',
    'Policy Document',
    'Update Personal Details',
    'Other',
  ];

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user ? user.token : null;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const complaintData = {
        policyNumber,
        category,
        title,
        description,
      };

      await axios.post('/api/complaints', complaintData, config);

      toast.success('Complaint submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit complaint');
    }
  };

  return (
    <Layout>
      <div className="p-8 max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Submit New Complaint</h1>
          <p className="text-gray-500 mt-2">
            Please provide detailed information about your issue to help us resolve it quickly
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Policy Number */}
            <div>
              <label htmlFor="policyNumber" className="block text-sm font-medium text-gray-900 mb-2">
                Policy Number
              </label>
              <input
                type="text"
                id="policyNumber"
                name="policyNumber"
                value={policyNumber}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="e.g., POL-2024-1001"
              />
              <p className="mt-1 text-sm text-gray-500">Enter your insurance policy number</p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">Choose the category that best describes your issue</p>
            </div>

            {/* Title / Subject */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                Title / Subject
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                placeholder="Brief summary of your issue"
              />
              <p className="mt-1 text-sm text-gray-500">Provide a concise title for your complaint</p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                required
                rows="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                placeholder="Please provide detailed information about your issue, including relevant dates, amounts, and any steps you've already taken..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-900 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
              >
                Submit Complaint
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default NewComplaint;
