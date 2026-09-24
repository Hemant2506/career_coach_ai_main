import React, { createContext, useContext, useState, useEffect } from 'react';
import { JOBS } from '../data/jobs';
import { COURSES } from '../data/courses';
import { INDUSTRIES } from '../data/industries';
import { CAREERS } from '../data/careers';
import { INTERVIEW_QUESTIONS } from '../data/interviewQuestions';
import { DEFAULT_INTERVIEW_HISTORY } from '../data/interviewResults';
import { ASSESSMENTS } from '../data/assessments';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = 'toast_' + Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Saved Jobs
  const [savedJobIds, setSavedJobIds] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachSavedJobs');
      return saved ? JSON.parse(saved) : ['job_1', 'job_4'];
    } catch {
      return ['job_1', 'job_4'];
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachSavedJobs', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      if (exists) {
        showToast('Job removed from saved list', 'info');
        return prev.filter(id => id !== jobId);
      } else {
        showToast('✓ Job saved successfully', 'success');
        return [...prev, jobId];
      }
    });
  };

  const isJobSaved = (jobId) => savedJobIds.includes(jobId);

  // Admin and Master Data States
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachAdminJobs');
      return saved ? JSON.parse(saved) : JOBS;
    } catch {
      return JOBS;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachAdminJobs', JSON.stringify(jobs));
  }, [jobs]);

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachAdminCourses');
      return saved ? JSON.parse(saved) : COURSES;
    } catch {
      return COURSES;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachAdminCourses', JSON.stringify(courses));
  }, [courses]);

  const [industries, setIndustries] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachAdminIndustries');
      return saved ? JSON.parse(saved) : INDUSTRIES;
    } catch {
      return INDUSTRIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachAdminIndustries', JSON.stringify(industries));
  }, [industries]);

  const [interviewQuestions, setInterviewQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachAdminQuestions');
      return saved ? JSON.parse(saved) : INTERVIEW_QUESTIONS;
    } catch {
      return INTERVIEW_QUESTIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachAdminQuestions', JSON.stringify(interviewQuestions));
  }, [interviewQuestions]);

  // Course Progress tracking
  const [courseProgress, setCourseProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachCourseProgress');
      if (saved) return JSON.parse(saved);
      // Initialize with default completed lessons from mock courses
      const initial = {};
      COURSES.forEach(c => {
        const completedIds = [];
        c.modules?.forEach(m => {
          m.lessons?.forEach(l => {
            if (l.completed) completedIds.push(l.id);
          });
        });
        initial[c.id] = {
          completedLessonIds: completedIds,
          progress: c.progress || 0
        };
      });
      return initial;
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachCourseProgress', JSON.stringify(courseProgress));
  }, [courseProgress]);

  const markLessonComplete = (courseId, lessonId) => {
    setCourseProgress(prev => {
      const current = prev[courseId] || { completedLessonIds: [], progress: 0 };
      const alreadyCompleted = current.completedLessonIds.includes(lessonId);
      const updatedIds = alreadyCompleted
        ? current.completedLessonIds
        : [...current.completedLessonIds, lessonId];

      const targetCourse = courses.find(c => c.id === courseId);
      let totalLessons = 10;
      if (targetCourse?.modules) {
        totalLessons = targetCourse.modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
      }
      const newPercent = Math.min(100, Math.round((updatedIds.length / (totalLessons || 1)) * 100));

      showToast(alreadyCompleted ? 'Lesson is already marked complete' : '✓ Lesson completed! Progress updated.', 'success');

      return {
        ...prev,
        [courseId]: {
          completedLessonIds: updatedIds,
          progress: newPercent
        }
      };
    });
  };

  // Interview History
  const [interviewHistory, setInterviewHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachInterviewHistory');
      return saved ? JSON.parse(saved) : DEFAULT_INTERVIEW_HISTORY;
    } catch {
      return DEFAULT_INTERVIEW_HISTORY;
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachInterviewHistory', JSON.stringify(interviewHistory));
  }, [interviewHistory]);

  const addInterviewResult = (newResult) => {
    setInterviewHistory(prev => [newResult, ...prev]);
    showToast('✓ Interview completed & evaluated by AI!', 'success');
  };

  // Assessment History
  const [assessmentHistory, setAssessmentHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('careerCoachAssessmentHistory');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ass_prev_1',
          assessmentId: 'assessment_sql',
          title: 'SQL & Databases',
          score: 85,
          total: 100,
          date: 'Yesterday',
          status: 'Passed'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('careerCoachAssessmentHistory', JSON.stringify(assessmentHistory));
  }, [assessmentHistory]);

  const addAssessmentResult = (result) => {
    setAssessmentHistory(prev => [result, ...prev]);
    showToast('✓ Assessment submitted & score recorded!', 'success');
  };

  // Admin CRUD operations
  const addJob = (newJob) => {
    const jobWithId = {
      ...newJob,
      id: 'job_' + Date.now(),
      postedDate: 'Just now'
    };
    setJobs(prev => [jobWithId, ...prev]);
    showToast('✓ Job listing added successfully');
    return jobWithId;
  };

  const updateJob = (jobId, updates) => {
    setJobs(prev => prev.map(j => (j.id === jobId ? { ...j, ...updates } : j)));
    showToast('✓ Job updated successfully');
  };

  const deleteJob = (jobId) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
    showToast('Job listing removed', 'info');
  };

  const addCourse = (newCourse) => {
    const courseWithId = {
      ...newCourse,
      id: 'course_' + Date.now(),
      progress: 0,
      totalLessons: newCourse.totalLessons || 8,
      rating: 4.8
    };
    setCourses(prev => [courseWithId, ...prev]);
    showToast('✓ Course created successfully');
    return courseWithId;
  };

  const updateCourse = (courseId, updates) => {
    setCourses(prev => prev.map(c => (c.id === courseId ? { ...c, ...updates } : c)));
    showToast('✓ Course updated successfully');
  };

  const deleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    showToast('Course removed', 'info');
  };

  const addIndustry = (newIndustry) => {
    const indWithId = {
      ...newIndustry,
      id: 'ind_' + Date.now(),
      jobRolesCount: newIndustry.jobRolesCount || 10
    };
    setIndustries(prev => [...prev, indWithId]);
    showToast('✓ Industry category added');
    return indWithId;
  };

  const updateIndustry = (industryId, updates) => {
    setIndustries(prev => prev.map(ind => (ind.id === industryId ? { ...ind, ...updates } : ind)));
    showToast('✓ Industry updated');
  };

  const deleteIndustry = (industryId) => {
    setIndustries(prev => prev.filter(ind => ind.id !== industryId));
    showToast('Industry removed', 'info');
  };

  const addQuestion = (roleId, question) => {
    setInterviewQuestions(prev => {
      const currentRole = prev[roleId] || { title: roleId, questions: [] };
      const newQ = {
        ...question,
        id: 'q_' + Date.now()
      };
      return {
        ...prev,
        [roleId]: {
          ...currentRole,
          questions: [...currentRole.questions, newQ]
        }
      };
    });
    showToast('✓ Interview question added');
  };

  const deleteQuestion = (roleId, questionId) => {
    setInterviewQuestions(prev => {
      const currentRole = prev[roleId];
      if (!currentRole) return prev;
      return {
        ...prev,
        [roleId]: {
          ...currentRole,
          questions: currentRole.questions.filter(q => q.id !== questionId)
        }
      };
    });
    showToast('Interview question deleted', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        jobs,
        savedJobIds,
        toggleSaveJob,
        isJobSaved,
        courses,
        courseProgress,
        markLessonComplete,
        industries,
        careers: CAREERS,
        assessments: ASSESSMENTS,
        interviewQuestions,
        interviewHistory,
        addInterviewResult,
        assessmentHistory,
        addAssessmentResult,
        // Admin CRUD
        addJob,
        updateJob,
        deleteJob,
        addCourse,
        updateCourse,
        deleteCourse,
        addIndustry,
        updateIndustry,
        deleteIndustry,
        addQuestion,
        deleteQuestion
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
