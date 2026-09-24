import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Video
} from 'lucide-react';

export default function VideoLecturePage() {
  const { id, lessonId } = useParams();
  const { courses, courseProgress, markLessonComplete } = useApp();
  const navigate = useNavigate();

  const course = courses.find(c => c.id === id) || courses[0];
  const progressObj = courseProgress[course.id] || { completedLessonIds: [], progress: 0 };
  const completedIds = progressObj.completedLessonIds || [];

  // Flatten all lessons across all modules
  const allLessons = [];
  course.modules?.forEach(mod => {
    mod.lessons?.forEach(l => {
      allLessons.push({ ...l, moduleTitle: mod.title });
    });
  });

  const currentIndex = allLessons.findIndex(l => l.id === lessonId);
  const currentLesson = currentIndex >= 0 ? allLessons[currentIndex] : allLessons[0];
  const isCurrentCompleted = completedIds.includes(currentLesson?.id);

  // Video player custom controls state
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    // Reset video state on lesson change
    setIsPlaying(false);
    setCurrentTime(0);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [lessonId]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setVideoError(true);
      });
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMarkComplete = () => {
    if (currentLesson) {
      markLessonComplete(course.id, currentLesson.id);
    }
  };

  const handleNext = () => {
    if (currentIndex < allLessons.length - 1) {
      navigate(`/courses/${course.id}/lesson/${allLessons[currentIndex + 1].id}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(`/courses/${course.id}/lesson/${allLessons[currentIndex - 1].id}`);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Course Outline</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">
          Lesson {currentIndex + 1} of {allLessons.length}
        </span>
      </div>

      {/* 30. Video Player + Course Content Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video shadow-xl border border-slate-800 flex flex-col justify-end group">
            {/* HTML5 Video Element */}
            <video
              ref={videoRef}
              src={currentLesson?.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                handleMarkComplete();
              }}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
              playsInline
            />

            {/* Video Fallback Placeholder (if video cannot stream) */}
            {videoError && (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-16 h-16 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center mb-3">
                  <Video className="w-8 h-8 text-indigo-300" />
                </div>
                <h3 className="text-base font-bold">{currentLesson?.title}</h3>
                <p className="text-xs text-indigo-200/80 max-w-sm mt-1">
                  High-Definition Video Lecture stream simulation. You can review the lesson summary and key takeaways below.
                </p>
                <button
                  onClick={() => setVideoError(false)}
                  className="mt-4 px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white"
                >
                  Retry Player Stream
                </button>
              </div>
            )}

            {/* Center Big Play Button Overlay when paused */}
            {!isPlaying && !videoError && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1" />
                </div>
              </div>
            )}

            {/* Custom Bottom Control Bar */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col gap-2">
              {/* Scrub Bar */}
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />

              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-3">
                  <button onClick={togglePlay} className="hover:text-indigo-400 transition-colors">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) videoRef.current.currentTime -= 10;
                    }}
                    className="hover:text-indigo-400 transition-colors"
                    title="Rewind 10s"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                        setIsMuted(!isMuted);
                      }
                    }}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSpeedChange}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    {playbackSpeed}x
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current?.requestFullscreen) {
                        videoRef.current.requestFullscreen();
                      }
                    }}
                    className="hover:text-indigo-400 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Title & Action Controls */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  {currentLesson?.moduleTitle}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {currentLesson?.title}
                </h2>
                <span className="text-xs text-slate-400">{currentLesson?.duration}</span>
              </div>

              {/* [Previous] [Mark Complete] [Next] */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Previous Lesson"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={handleMarkComplete}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    isCurrentCompleted
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isCurrentCompleted ? 'Completed ✓' : 'Mark Complete'}</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentIndex === allLessons.length - 1}
                  className="p-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                  title="Next Lesson"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lesson Summary & Key Takeaways */}
            <div className="pt-4 space-y-4 text-xs">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                  Lesson Overview
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {currentLesson?.summary || 'In this lecture, we review key design patterns and implement practical examples directly in code.'}
                </p>
              </div>

              {currentLesson?.keyTakeaways && currentLesson.keyTakeaways.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                    Key Technical Takeaways
                  </h3>
                  <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
                    {currentLesson.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Course Content Sidebar List */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[600px]">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 mb-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Course Content
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {completedIds.length} of {allLessons.length} lessons finished ({progressObj.progress}%)
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {allLessons.map((lesson, idx) => {
              const isSelected = lesson.id === currentLesson?.id;
              const isCompleted = completedIds.includes(lesson.id);

              return (
                <button
                  key={lesson.id}
                  onClick={() => navigate(`/courses/${course.id}/lesson/${lesson.id}`)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-start gap-2.5 transition-colors ${
                    isSelected
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : isSelected ? (
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      </div>
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold leading-tight line-clamp-2 ${
                      isSelected
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-800 dark:text-slate-200'
                    }`}>
                      {idx + 1}. {lesson.title}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {lesson.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
