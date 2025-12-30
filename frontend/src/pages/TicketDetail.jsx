import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, FileText, User, Mail, Phone, Download, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { StatusBadge } from '../components/StatusBadge';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          navigate('/');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const response = await axios.get(`/api/complaints/${id}`, config);
        setTicket(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch ticket details');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-2 text-sm underline hover:text-red-800"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!ticket) return null;

  // Progress Bar Logic
  const steps = ['Pending', 'In Progress', 'Resolved'];
  const currentStepIndex = steps.indexOf(ticket.status) === -1 ? 0 : steps.indexOf(ticket.status);
  const progressPercentage = ((currentStepIndex) / (steps.length - 1)) * 100;

  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>

        {/* Header Section */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  Ticket #{ticket._id.substring(ticket._id.length - 6)}
                </h1>
                <StatusBadge status={ticket.status} />
              </div>
              <p className="text-gray-500 text-sm">
                Submitted on {new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Status Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-900 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {steps.map((step, index) => (
                <span key={step} className={`${index <= currentStepIndex ? 'text-blue-900 font-semibold' : ''}`}>
                  {step}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Issue Description Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Issue Description</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Subject</h3>
                  <p className="text-gray-900 font-medium">{ticket.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {ticket.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText className="w-4 h-4" />
                    <span className="font-medium">Policy Number:</span>
                    <span className="text-gray-900">{ticket.policyNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Category:</span>
                    <span className="text-gray-900">{ticket.category}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments Card (Placeholder) */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
              <h3>No attachment attached (yet to be implemented )</h3>
              <div className="space-y-3">
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            
            {/* Assigned To Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Assigned To</h2>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                  MS
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Mahima Shetty</p>
                  <p className="text-xs text-gray-500">Department of Insurance</p>
                  <p className="text-xs text-blue-600 mt-1">m.santos@trackticket</p>
                </div>
              </div>
            </div>

            {/* Status History Card */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Status History</h2>
              <div className="relative pl-4 border-l-2 border-gray-100 space-y-6">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></div>
                  <p className="text-sm font-medium text-gray-900">Submitted</p>
                  <p className="text-xs text-gray-500">{new Date(ticket.createdAt).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">Issue reported by user</p>
                </div>
                {/* Placeholder history items */}
                {ticket.status !== 'Pending' && (
                   <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-blue-500 bg-white"></div>
                    <p className="text-sm font-medium text-gray-900">Under Review</p>
                    <p className="text-xs text-gray-500">Pending...</p>
                    <p className="text-xs text-gray-400 mt-1">Assigned to Claims Dept</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TicketDetail;
