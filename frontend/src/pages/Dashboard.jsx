import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/StatusBadge';
import { 
  FileText, AlertCircle, CheckCircle, Plus, Search, Filter, 
  MoreHorizontal, Eye, Bell, BarChart2, Clock 
} from 'lucide-react';
import Layout from '../components/Layout';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: 'User' });
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchTickets(parsedUser.token);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const fetchTickets = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get('/api/complaints', config);
      
      // Map backend data to frontend structure
      const mappedTickets = response.data.map(ticket => ({
        id: ticket._id,
        policyNumber: ticket.policyNumber,
        category: ticket.category,
        subject: ticket.title,
        dateSubmitted: new Date(ticket.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        status: ticket.status,
        priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] 
      }));

      setTickets(mappedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      label: "Total Issues",
      value: tickets.length,
      subtext: "+2 this week",
      icon: FileText,
      bgClass: "bg-indigo-600",
      textClass: "text-white"
    },
    {
      label: "Pending Action",
      value: tickets.filter((t) => t.status === "Pending").length,
      subtext: "Needs attention",
      icon: AlertCircle,
      bgClass: "bg-orange-500",
      textClass: "text-white"
    },
    {
      label: "Under Review",
      value: tickets.filter((t) => t.status === "In Progress").length,
      subtext: "Being processed",
      icon: Clock,
      bgClass: "bg-blue-500",
      textClass: "text-white"
    },
    {
      label: "Resolved",
      value: tickets.filter((t) => t.status === "Resolved").length,
      subtext: "Completed",
      icon: CheckCircle,
      bgClass: "bg-emerald-500",
      textClass: "text-white"
    },
  ];

  const bottomCards = [
    {
      title: "Submit New Issue",
      desc: "Report a problem to local administration",
      icon: Plus,
      action: () => navigate("/new-complaint"),
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "View Analytics",
      desc: "See trends and resolution times",
      icon: BarChart2,
      action: () => {},
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      title: "Notification Settings",
      desc: "Manage your alert preferences",
      icon: Bell,
      action: () => {},
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome back, {user.name}</h1>
            <p className="text-gray-500">
              Here's an overview of your local administration issues
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block mr-4">
              <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" />
                {currentTime.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 bg-white rounded-lg border border-gray-200 shadow-sm">
              <Bell className="w-5 h-5" />
            </button>
            <Button onClick={() => navigate("/new-complaint")} className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-md shadow-indigo-200">
              <Plus className="w-5 h-5" />
              New Issue
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.bgClass} rounded-xl p-6 shadow-lg text-white relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium opacity-90">{stat.label}</p>
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{stat.value}</h2>
                  <p className="text-xs opacity-75">{stat.subtext}</p>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              </div>
            );
          })}
        </div>

        {/* Recent Tickets Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-indigo-600 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
                </div>
                Recent Issues
              </h3>
              <p className="text-sm text-gray-500 mt-1 ml-10">Track and manage your submissions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Issue ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tickets.length > 0 ? (
                  tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer group"
                      onClick={() => navigate(`/complaint/${ticket.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-indigo-600 font-semibold text-sm">#{ticket.id.substring(ticket.id.length - 6).toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                        {ticket.policyNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          {ticket.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 text-sm font-medium">
                        {ticket.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                        {ticket.dateSubmitted}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            ticket.priority === 'High' ? 'bg-red-500' : 
                            ticket.priority === 'Medium' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <span className="text-sm text-gray-600">{ticket.priority}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                          <p>Loading tickets...</p>
                        </div>
                      ) : 'No tickets found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bottomCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index}
                onClick={card.action}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard
