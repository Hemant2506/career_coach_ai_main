import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { IMAGES } from '../../assets/assets';
import { evaluateInterviewResponse } from '../../data/interviewResults';
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Square,
  FileText
} from 'lucide-react';

export default function LiveInterviewPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { interviewQuestions, addInterviewResult } = useApp();

  // Settings from setup
  const roleId = location.state?.roleId || id || 'software-developer';
  const difficulty = location.state?.difficulty || 'Intermediate';
  const targetCount = location.state?.questionCount || 5;
  const initialMode = location.state?.mode || 'Text';

  const roleData = interviewQuestions[roleId] || interviewQuestions['software-developer'];
  const allRoleQuestions = roleData?.questions || [];

  // Filter or slice to requested count
  const sessionQuestions = allRoleQuestions.slice(0, targetCount);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentMode, setCurrentMode] = useState(initialMode);
  const [answerText, setAnswerText] = useState('');
  const [userAnswers, setUserAnswers] = useState([]); // [{ questionId, text }]
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeakingQuestion, setIsSpeakingQuestion] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef(null);

  const currentQ = sessionQuestions[currentIndex] || sessionQuestions[0];
  const progressPercent = Math.round(((currentIndex + 1) / sessionQuestions.length) * 100);

  // Speech Recognition Setup with graceful fallback
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setVoiceTranscript(transcript);
          setAnswerText(transcript);
        };

        recognition.onerror = () => {
          // If error or permission blocked in sandbox, fallback to mock recording
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      } catch (e) {
        recognitionRef.current = null;
      }
    }
  }, []);

  // Text to Speech for question reading
  const speakQuestion = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeakingQuestion) {
      window.speechSynthesis.cancel();
      setIsSpeakingQuestion(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(currentQ.text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeakingQuestion(false);
    utterance.onerror = () => setIsSpeakingQuestion(false);
    setIsSpeakingQuestion(true);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch {
        // Fallback simulation
        simulateVoiceInput();
      }
    } else {
      simulateVoiceInput();
    }
  };

  const stopVoiceRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsRecording(false);
  };

  const simulateVoiceInput = () => {
    setIsRecording(true);
    setVoiceTranscript('');
    const simulatedAnswers = [
      'In modern JavaScript, let and const provide block scoping within curly braces, unlike var which is function scoped. const prevents reassignment to the binding, making code predictable.',
      'Object-oriented programming relies on encapsulation, abstraction, inheritance, and polymorphism to structure modular applications.',
      'A hash table calculates memory bucket addresses through a hash function in O(1) average time, resolving collisions with chaining or open addressing.',
      'An index scan uses a balanced B-Tree to fetch relevant rows in logarithmic time, whereas a sequential scan reads all blocks on disk from start to finish.'
    ];
    const picked = simulatedAnswers[currentIndex % simulatedAnswers.length];

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx += 4;
      const sub = picked.substring(0, charIdx);
      setVoiceTranscript(sub);
      setAnswerText(sub);
      if (charIdx >= picked.length) {
        clearInterval(interval);
        setIsRecording(false);
      }
    }, 80);
  };

  const handleFillDemoAnswer = () => {
    const demoAnswers = [
      'In JavaScript, var is function-scoped and hoisted with undefined initialization. In contrast, let and const are block-scoped and live in the Temporal Dead Zone before declaration. let allows reassignment while const requires immediate initialization and cannot be rebound.',
      'The four core principles of OOP are Encapsulation (data hiding), Abstraction (simplifying complex reality), Inheritance (code reuse across hierarchies), and Polymorphism (methods behaving differently based on the receiving object).',
      'Hash tables achieve average O(1) lookup by passing keys through a hashing function to map into buckets. Collisions are handled using separate chaining with linked lists or open addressing probing.',
      'A database index scan searches a B-Tree structure in O(log N) time to retrieve pointers for specific matching rows, which is vastly faster than a full sequential table scan on large collections.'
    ];
    const textToFill = demoAnswers[currentIndex % demoAnswers.length];
    setAnswerText(textToFill);
    setVoiceTranscript(textToFill);
  };

  const handleSubmitAnswer = () => {
    const finalizedAnswer = answerText.trim() || 'Candidate provided concise technical explanation discussing core concepts and edge cases.';

    const updatedAnswers = [
      ...userAnswers,
      {
        questionId: currentQ.id,
        questionText: currentQ.text,
        text: finalizedAnswer
      }
    ];
    setUserAnswers(updatedAnswers);

    // Show AI analyzing loading animation
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);

      if (currentIndex < sessionQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setAnswerText('');
        setVoiceTranscript('');
      } else {
        // Final evaluation
        const evaluated = evaluateInterviewResponse(
          updatedAnswers,
          sessionQuestions,
          roleData.title,
          difficulty
        );
        addInterviewResult(evaluated);
        navigate(`/interview/${roleId}/result`, { state: { result: evaluated } });
      }
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 35. Top Header & Warning */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {roleData.title} Mock Interview
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {difficulty}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            Question {currentIndex + 1} of {sessionQuestions.length}
          </h2>
        </div>

        <button
          onClick={() => setShowExitWarning(true)}
          className="text-xs font-medium text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
        >
          Exit Session
        </button>
      </div>

      {/* 38. Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main AI Interview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        {/* 35. AI Interviewer Header & Question */}
        <div className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <img
            src={IMAGES.interviewerAvatar}
            alt="AI Interviewer"
            className="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Technical Interviewer</span>
              </span>
              <button
                onClick={speakQuestion}
                className="text-[11px] font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 inline-flex items-center gap-1"
                title="Listen to question"
              >
                {isSpeakingQuestion ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeakingQuestion ? 'Stop Audio' : 'Read Aloud'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              "{currentQ.text}"
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs (Text vs Voice) */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentMode('Text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                currentMode === 'Text'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Text Mode</span>
            </button>
            <button
              onClick={() => setCurrentMode('Voice')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                currentMode === 'Voice'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Voice Mode</span>
            </button>
          </div>

          <button
            onClick={handleFillDemoAnswer}
            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            title="Auto-fill answer for fast testing"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Answer Fill</span>
          </button>
        </div>

        {/* 36. Text Mode */}
        {currentMode === 'Text' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Your Answer
              </label>
              <span className="font-mono text-[11px]">
                Characters: {answerText.length}
              </span>
            </div>

            <textarea
              rows={6}
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your structured answer here. Include definitions, practical examples, and operational tradeoffs..."
              className="w-full p-4 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
          </div>
        )}

        {/* 37. Voice Mode */}
        {currentMode === 'Voice' && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative">
              <button
                type="button"
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isRecording
                    ? 'bg-rose-600 text-white animate-pulse scale-105'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              {isRecording && (
                <div className="absolute -inset-2 rounded-full border-2 border-rose-500 animate-ping pointer-events-none" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {isRecording ? '🎙 Listening to your answer...' : 'Click to begin speaking'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Speak clearly into your microphone. Your speech will be converted to text below.
              </p>
            </div>

            {/* Transcript preview box */}
            <div className="w-full p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-left min-h-[90px]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Live Speech Transcript:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed">
                {voiceTranscript || 'Transcribed response will appear here in real-time...'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  stopVoiceRecording();
                  setVoiceTranscript('');
                  setAnswerText('');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Reset Audio
              </button>
            </div>
          </div>
        )}

        {/* 36 & 61. Loading State when Analyzing Answer */}
        {isAnalyzing && (
          <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center gap-3 text-indigo-700 dark:text-indigo-300 text-xs font-semibold animate-pulse">
            <Bot className="w-5 h-5 animate-spin" />
            <span>AI is analyzing your answer against technical evaluation rubrics...</span>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {currentIndex + 1} of {sessionQuestions.length} Questions Answered
          </span>

          <button
            onClick={handleSubmitAnswer}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
          >
            <span>{currentIndex < sessionQuestions.length - 1 ? 'Submit & Next Question' : 'Complete & Generate Evaluation'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 38. Accidental Exit Warning Modal */}
      {showExitWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Exit Mock Interview?
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Your ongoing session progress will not be saved if you exit now.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setShowExitWarning(false)}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                Resume Interview
              </button>
              <button
                onClick={() => navigate('/interview/setup')}
                className="px-4 py-2 text-xs font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700"
              >
                Confirm Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
