import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  X,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminManageJobsPage() {
  const { jobs, addJob, updateJob, deleteJob } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Vadodara, Gujarat',
    salary: '₹4 - ₹6 LPA',
    jobType: 'Full Time',
    experience: 'Fresher',
    industry: 'it',
    industryName: 'Information Technology',
    roleCategory: 'Software Developer',
    qualification: 'B.Tech / B.E / BCA',
    skills: 'Java, SQL, Git',
    description: ''
  });

  const filteredJobs = jobs.filter(j =>
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingJob(null);
    setFormData({
      title: '',
      company: '',
      location: 'Vadodara, Gujarat',
      salary: '₹4 - ₹6 LPA',
      jobType: 'Full Time',
      experience: 'Fresher',
      industry: 'it',
      industryName: 'Information Technology',
      roleCategory: 'Software Developer',
      qualification: 'B.Tech / B.E / BCA',
      skills: 'Java, SQL, Git',
      description: 'Exciting fresher opening with mentoring and career growth.'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      salary: job.salary,
      jobType: job.jobType,
      experience: job.experience,
      industry: job.industry,
      industryName: job.industryName,
      roleCategory: job.roleCategory,
      qualification: job.qualification,
      skills: Array.isArray(job.skills) ? job.skills.join(', ') : job.skills,
      description: job.description
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...formData,
      skills: skillsArray
    };

    if (editingJob) {
      updateJob(editingJob.id, payload);
    } else {
      addJob(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteJob(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 49. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage Job Listings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, update, and manage vacancies available to college students.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Job</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          placeholder="Filter jobs by title, company, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        />
      </div>

      {/* 49. Jobs Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5 font-semibold">Job Title</th>
                <th className="py-3 px-5 font-semibold">Company</th>
                <th className="py-3 px-5 font-semibold">Location</th>
                <th className="py-3 px-5 font-semibold">Salary</th>
                <th className="py-3 px-5 font-semibold">Experience</th>
                <th className="py-3 px-5 font-semibold">Status</th>
                <th className="py-3 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-5 font-semibold text-slate-900 dark:text-white">
                    {job.title}
                  </td>
                  <td className="py-3 px-5 text-slate-600 dark:text-slate-400">
                    {job.company}
                  </td>
                  <td className="py-3 px-5 text-slate-500">
                    {job.location}
                  </td>
                  <td className="py-3 px-5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {job.salary}
                  </td>
                  <td className="py-3 px-5 text-slate-500">
                    {job.experience}
                  </td>
                  <td className="py-3 px-5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right whitespace-nowrap space-x-1">
                    <Link
                      to={`/jobs/${job.id}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-indigo-600 inline-block"
                      title="Preview Job"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditModal(job)}
                      className="p-1.5 text-slate-400 hover:text-purple-600 inline-block"
                      title="Edit Job"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id, job.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 inline-block"
                      title="Delete Job"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingJob ? 'Edit Job Opening' : 'Add New Job Opening'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs max-h-[75vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Software Engineer"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. ABC Technologies"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Salary Range *</label>
                  <input
                    type="text"
                    required
                    value={formData.salary}
                    onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="e.g. ₹4 - ₹6 LPA"
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Experience *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Year">0-1 Year</option>
                    <option value="1-2 Years">1-2 Years</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Employment Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  >
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                  placeholder="Java, SQL, React, Git"
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Job Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700"
                >
                  {editingJob ? 'Update Job' : 'Publish Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
