import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Mail, Phone, FileText, Video, Search, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import toast from 'react-hot-toast';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const faqData = [
    {
      id: 1,
      question: "How do I create my first skill analysis?",
      answer: "Navigate to the Dashboard and fill out the skill analysis form. Select your technical and healthcare skills, then click 'Analyze Skills' to generate your personalized report."
    },
    {
      id: 2,
      question: "Can I export my analysis reports?",
      answer: "Yes! You can export your analysis reports as PDF files. Go to your analysis details and click the 'Export PDF' button to download your report."
    },
    {
      id: 3,
      question: "How is my skill gap calculated?",
      answer: "Our algorithm analyzes your current skills against industry standards and job requirements to identify gaps. The analysis considers skill levels, experience, and market demand."
    },
    {
      id: 4,
      question: "Is my data secure and private?",
      answer: "Absolutely! We use industry-standard encryption and security measures. Your data is stored securely and never shared without your explicit consent."
    },
    {
      id: 5,
      question: "How often should I update my skill analysis?",
      answer: "We recommend updating your analysis every 3-6 months or whenever you acquire new skills or change roles to keep your learning path current."
    },
    {
      id: 6,
      question: "Can I delete my account and data?",
      answer: "Yes, you can delete your account anytime from Settings > Data Management. This will permanently remove all your data from our systems."
    }
  ];

  const supportResources = [
    {
      title: "User Guide",
      description: "Complete guide to using all platform features",
      icon: FileText,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      icon: Video,
      link: "#"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers",
      icon: FileText,
      link: "#"
    }
  ];

  const contactMethods = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      action: "Start Chat",
      available: "24/7"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      action: "Send Email",
      available: "Response within 24h"
    },
    {
      title: "Phone Support",
      description: "Speak directly with our team",
      icon: Phone,
      action: "Call Now",
      available: "Mon-Fri 9AM-6PM"
    }
  ];

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  const handleResourceClick = (resource) => {
    // TODO: Implement resource navigation
    toast.info(`Opening ${resource.title}...`);
  };

  const handleContactAction = (method) => {
    // TODO: Implement contact method actions
    toast.info(`Initiating ${method.title}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/home')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {filteredFaqs.length === 0 && (
                <p className="text-center text-gray-500 py-8">No FAQs found matching your search.</p>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Support</h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={contactForm.priority}
                    onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows="5"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe your issue or question..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Contact</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{method.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                          <p className="text-xs text-gray-500 mb-3">{method.available}</p>
                          <Button
                            size="sm"
                            onClick={() => handleContactAction(method)}
                            className="w-full"
                          >
                            {method.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
              <div className="space-y-3">
                {supportResources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleResourceClick(resource)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
                    >
                      <Icon className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{resource.title}</p>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email Service</span>
                  <span className="flex items-center gap-2 text-sm text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;