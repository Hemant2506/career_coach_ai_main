import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminManageIndustriesPage() {
  const { industries, addIndustry, updateIndustry, deleteIndustry } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInd, setEditingInd] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    popularRoles: 'Software Developer, Data Analyst',
    popularSkills: 'Java, Python, SQL',
    jobRolesCount: 15,
    marketGrowth: '+15% Annual Growth',
    icon: 'Building2'
  });

  const filteredIndustries = industries.filter(ind =>
    ind.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ind.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingInd(null);
    setFormData({
      name: '',
      description: 'Dynamic industry vertical with expanding digital opportunities.',
      popularRoles: 'Software Developer, Systems Engineer',
      popularSkills: 'Java, Python, SQL, Git',
      jobRolesCount: 12,
      marketGrowth: '+14% Annual Hiring',
      icon: 'Building2'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (ind) => {
    setEditingInd(ind);
    setFormData({
      name: ind.name,
      description: ind.description,
      popularRoles: Array.isArray(ind.popularRoles) ? ind.popularRoles.join(', ') : ind.popularRoles,
      popularSkills: Array.isArray(ind.popularSkills) ? ind.popularSkills.join(', ') : ind.popularSkills,
      jobRolesCount: ind.jobRolesCount,
      marketGrowth: ind.marketGrowth || '+15% Annual Growth',
      icon: ind.icon || 'Building2'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rolesArray = formData.popularRoles.split(',').map(s => s.trim()).filter(Boolean);
    const skillsArray = formData.popularSkills.split(',').map(s => s.trim()).filter(Boolean);

    const payload = {
      ...formData,
      popularRoles: rolesArray,
      popularSkills: skillsArray
    };

    if (editingInd) {
      updateIndustry(editingInd.id, payload);
    } else {
      addIndustry(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete industry sector "${name}"?`)) {
      deleteIndustry(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 51. Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage Industry Verticals
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure sector hiring insights, popular job classifications, and in-demand skills.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Sector</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-3.5 h-3.5" />
        </div>
        <input
          type="text"
          placeholder="Search industry names or descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
        />
      </div>

      {/* 51. Industries Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-5 font-semibold">Industry Name</th>
                <th className="py-3 px-5 font-semibold">Overview</th>
                <th className="py-3 px-5 font-semibold">Roles Count</th>
                <th className="py-3 px-5 font-semibold">Growth Metric</th>
                <th className="py-3 px-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredIndustries.map((ind) => (
                <tr key={ind.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-5 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                    {ind.name}
                  </td>
                  <td className="py-3 px-5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {ind.description}
                  </td>
                  <td className="py-3 px-5 font-mono text-slate-700 dark:text-slate-300">
                    {ind.jobRolesCount} Roles
                  </td>
                  <td className="py-3 px-5 text-emerald-600 dark:text-emerald-400 font-medium whitespace-nowrap">
                    {ind.marketGrowth || '+15% Growth'}
                  </td>
                  <td className="py-3 px-5 text-right whitespace-nowrap space-x-1">
                    <Link
                      to={`/industries/${ind.id}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-indigo-600 inline-block"
                      title="Preview"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => openEditModal(ind)}
                      className="p-1.5 text-slate-400 hover:text-purple-600 inline-block"
                      title="Edit Industry"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(ind.id, ind.name)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 inline-block"
                      title="Delete Industry"
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {editingInd ? 'Edit Industry Details' : 'Add New Industry Sector'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1">Sector Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Fintech & Web3"
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description *</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Popular Roles (comma separated)</label>
                <input
                  type="text"
                  value={formData.popularRoles}
                  onChange={(e) => setFormData(prev => ({ ...prev, popularRoles: e.target.value }))}
                  placeholder="Software Engineer, Product Analyst"
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">In-Demand Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.popularSkills}
                  onChange={(e) => setFormData(prev => ({ ...prev, popularSkills: e.target.value }))}
                  placeholder="Java, Python, SQL"
                  className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Role Count</label>
                  <input
                    type="number"
                    value={formData.jobRolesCount}
                    onChange={(e) => setFormData(prev => ({ ...prev, jobRolesCount: parseInt(e.target.value, 10) }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Growth Metric</label>
                  <input
                    type="text"
                    value={formData.marketGrowth}
                    onChange={(e) => setFormData(prev => ({ ...prev, marketGrowth: e.target.value }))}
                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
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
                  Save Sector
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
