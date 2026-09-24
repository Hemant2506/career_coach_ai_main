import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  X
} from 'lucide-react';

export default function AssessmentInterfacePage() {
  const { id } = useParams();
  const { assessments, addAssessmentResult } = useApp();
  const navigate = useNavigate();

  const assessment = assessments.find(a => a.id === id) || assessments[0];
  const questions = assessment.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [timeLeft, setTimeLeft] = useState((assessment.timeLimitMinutes || 15) * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const currentQ = questions[currentIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  const handleSelectOption = (optIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const handleClearChoice = () => {
    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentIndex];
      return copy;
    });
  };

  const handleFinalSubmit = () => {
    // Grade the assessment
    let correctCount = 0;
    const reviewDetails = [];

    questions.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      const isCorrect = userChoice === q.correctIndex;
      if (isCorrect) correctCount++;

      reviewDetails.push({
        question: q.text,
        topic: q.topic || 'General',
        options: q.options,
        userChoice,
        correctIndex: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      });
    });

    const score = Math.round((correctCount / questions.length) * 100);

    const resultPayload = {
      assessmentId: assessment.id,
      title: assessment.title,
      score,
      correctCount,
      totalCount: questions.length,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      status: score >= 60 ? 'Passed' : 'Needs Practice',
      strongTopics: assessment.strongTopicsPool || ['Core Concepts'],
      weakTopics: assessment.weakTopicsPool || ['Advanced Applications'],
      reviewDetails
    };

    addAssessmentResult(resultPayload);
    navigate(`/assessments/${assessment.id}/result`, { state: { result: resultPayload } });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 32. Top Bar: Progress & Timer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {assessment.title} Assessment
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-xs font-bold ${
          timeLeft < 180
            ? 'bg-rose-50 text-rose-600 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Interface (3 cols) */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Topic: {currentQ?.topic || 'Core'}
              </span>
              {selectedAnswers[currentIndex] !== undefined && (
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Answer recorded
                </span>
              )}
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed mb-6">
              {currentQ?.text}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ?.options?.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3 border ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 ring-1 ring-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {selectedAnswers[currentIndex] !== undefined && (
                <button
                  onClick={handleClearChoice}
                  className="px-2.5 py-2 text-xs text-slate-400 hover:text-rose-500 transition-colors"
                >
                  Clear Choice
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {currentIndex < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Question Palette */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs h-fit space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Question Palette
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, qIdx) => {
              const isAnswered = selectedAnswers[qIdx] !== undefined;
              const isCurrent = qIdx === currentIndex;

              return (
                <button
                  key={qIdx}
                  onClick={() => setCurrentIndex(qIdx)}
                  className={`h-9 rounded-lg font-mono text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'ring-2 ring-indigo-600 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 bg-indigo-600 text-white'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {qIdx + 1}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-emerald-100 dark:bg-emerald-950 border border-emerald-400" />
              <span>Answered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300" />
              <span>Unattempted</span>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="w-full mt-2 py-2 px-3 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Finish & Review
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ready to submit assessment?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              You have answered <strong className="text-slate-800 dark:text-slate-200">{answeredCount}</strong> of {questions.length} questions.
              {answeredCount < questions.length && (
                <span className="text-amber-600 block mt-1">
                  ⚠️ {questions.length - answeredCount} questions are still unattempted.
                </span>
              )}
            </p>

            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Keep Testing
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
