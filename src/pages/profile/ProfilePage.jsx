import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../assets/assets';
import {
  User,
  Mail,
  GraduationCap,
  MapPin,
  Briefcase,
  Award,
  Edit3,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: user?.name || 'Hemant Saraswat',
    education: user?.education || 'B.Tech in Computer Science',
    qualification: user?.qualification || 'Undergraduate',
    graduationYear: user?.graduationYear || '2026',
    location: user?.location || 'Vadodara, Gujarat',
    careerGoal: user?.careerGoal || 'Software Developer',
    bio: user?.bio || 'Passionate software developer aiming to build scalable web applications.'
  });

  // Add skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(75);
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateProfile(editForm);
    setIsEditModalOpen(false);
    showToast('✓ Profile details updated successfully');
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const currentSkills = user?.skills || [];
    const updatedSkills = [
      ...currentSkills,
      { name: newSkillName.trim(), level: parseInt(newSkillLevel, 10), category: newSkillCategory }
    ];

    updateProfile({ skills: updatedSkills });
    setNewSkillName('');
    setIsAddSkillModalOpen(false);
    showToast(`✓ Added "${newSkillName}" to your skills profile`);
  };

  const handleDeleteSkill = (skillNameToRemove) => {
    const currentSkills = user?.skills || [];
    const updatedSkills = currentSkills.filter(s => s.name !== skillNameToRemove);
    updateProfile({ skills: updatedSkills });
    showToast(`Removed skill "${skillNameToRemove}"`, 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* 46. Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-5">
            <img
              src={user?.avatar || IMAGES.studentAvatar}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-indigo-500/10 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {user?.name || 'Hemant Saraswat'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Student Member
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email || 'demo@careercoach.ai'}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user?.location || 'Vadodara, Gujarat'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Bio */}
        <div className="py-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-b border-slate-100 dark:border-slate-800">
          {user?.bio || 'Aspiring software developer passionate about clean architecture and web performance.'}
        </div>

        {/* Academic Meta */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Degree & Program</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
              {user?.education || 'B.Tech in Computer Science'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Qualification</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              {user?.qualification || 'Undergraduate'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Graduation Batch</span>
            <span className="font-bold font-mono text-slate-800 dark:text-slate-200 mt-0.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Class of {user?.graduationYear || '2026'}
            </span>
          </div>
        </div>
      </div>

      {/* 46. Career Goal Section */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Selected Career Goal
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            {user?.careerGoal || 'Software Developer'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Target Industry: Information Technology · 68% Pathway Progress
          </p>
        </div>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Change Goal
        </button>
      </div>

      {/* 46. Skills Section with skill badges & Add Skill button */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Skills Portfolio
            </h2>
            <p className="text-xs text-slate-500">
              Verified competencies benchmarked against recruiter criteria
            </p>
          </div>

          <button
            onClick={() => setIsAddSkillModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Skill Badges List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(user?.skills || []).map((skill) => (
            <div
              key={skill.name}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between group hover:border-indigo-400 transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-[10px] text-slate-400">({skill.category || 'Core'})</span>
                </div>
                <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                  {skill.level}%
                </span>
                <button
                  onClick={() => handleDeleteSkill(skill.name)}
                  title="Remove skill"
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Edit Profile Information
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Education & Program
                </label>
                <input
                  type="text"
                  value={editForm.education}
                  onChange={(e) => setEditForm(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Graduation Year
                  </label>
                  <select
                    value={editForm.graduationYear}
                    onChange={(e) => setEditForm(prev => ({ ...prev, graduationYear: e.target.value }))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Career Goal
                  </label>
                  <input
                    type="text"
                    value={editForm.careerGoal}
                    onChange={(e) => setEditForm(prev => ({ ...prev, careerGoal: e.target.value }))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Professional Bio
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {isAddSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Add New Skill
              </h3>
              <button
                onClick={() => setIsAddSkillModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSkill} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TypeScript, Docker, Node.js"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Skill Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools & DevOps</option>
                  <option value="Core">Core Fundamentals</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Self-Assessed Proficiency
                  </label>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {newSkillLevel}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(e.target.value)}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddSkillModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
