import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/StatusBadge';
import { FileText, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import Layout from '../components/Layout';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'User' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const tickets = [
    {
      id: "GRV-101",
      policyNumber: "POL-2024-1001",
      category: "Premium Issue",
      subject: "Incorrect premium calculation for Q4 2024",
      dateSubmitted: "Dec 15, 2024",
      status: "In Progress",
    },
    {
      id: "GRV-102",
      policyNumber: "POL-2024-1002",
      category: "Claim Issue",
      subject: "Claim rejection without proper justification",
      dateSubmitted: "Dec 20, 2024",
      status: "Pending",
    },
    {
      id: "GRV-103",
      policyNumber: "POL-2023-0845",
      category: "Other",
      subject: "Policy document not received after renewal",
      dateSubmitted: "Dec 10, 2024",
      status: "Resolved",
    },
    {
      id: "GRV-104",
      policyNumber: "POL-2024-1003",
      category: "Claim Issue",
      subject: "Delayed claim settlement - 45 days overdue",
      dateSubmitted: "Nov 28, 2024",
      status: "In Progress",
    },
    {
      id: "GRV-105",
      policyNumber: "POL-2024-0956",
      category: "Premium Issue",
      subject: "Double payment deducted from bank account",
      dateSubmitted: "Dec 22, 2024",
      status: "Pending",
    },
  ];

  const stats = [
    {
      label: "Total Tickets",
      value: tickets.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Pending Action",
      value: tickets.filter((t) => t.status === "Pending" || t.status === "In Progress").length,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      label: "Resolved",
      value: tickets.filter((t) => t.status === "Resolved").length,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user.name}</h1>
            <p className="text-gray-500">
              Here's an overview of your insurance tickets
            </p>
          </div>
          <Button onClick={() => navigate("/new-complaint")} className="gap-2">
            <Plus className="w-5 h-5" />
            New Complaint
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-500 mb-2">{stat.label}</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-0">{stat.value}</h2>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-0">Recent Tickets</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Policy Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600 font-medium">#{ticket.id}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {ticket.policyNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {ticket.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard
