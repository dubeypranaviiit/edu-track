"use client";
import Hls from 'hls.js';
import { useEffect, useRef, useState } from "react";
import {
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiRotateCw,
  FiCornerLeftUp,
  FiCornerRightUp,
} from "react-icons/fi";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const VideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loop, setLoop] = useState(false);

  // Update current time
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Handle metadata loaded (duration)
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  // Play/Pause toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Fullscreen toggle
  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  // Seek bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = parseFloat(e.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Skip time
  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime += seconds;
  };

  // Mute toggle
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Playback speed toggle
  const changeSpeed = () => {
    const video = videoRef.current;
    if (!video) return;
    const newRate = playbackRate === 2 ? 0.5 : playbackRate + 0.5;
    video.playbackRate = newRate;
    setPlaybackRate(newRate);
  };

  // Loop toggle
  const toggleLoop = () => {
    const video = videoRef.current;
    if (!video) return;
    video.loop = !video.loop;
    setLoop(video.loop);
  };
// inside useEffect
useEffect(() => {
  const video = videoRef.current;
  if (!video || !Hls.isSupported()) return;

  const hls = new Hls();
  hls.loadSource("https://your-domain.com/video.m3u8");
  hls.attachMedia(video);

  return () => {
    hls.destroy();
  };
}, []);
  // Reset video on src change
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.load();
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [src]);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        loop={loop}
        // Optional autoplay
        // autoPlay
        // muted
      >
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/30 p-4 text-white space-y-2">
        {/* Seek Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={currentTime}
          onChange={handleSeek}
          className="w-full accent-blue-500"
        />

        {/* Time + Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
            <span className="text-gray-400">
              ({formatTime(duration - currentTime)} left)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button onClick={() => skipTime(-10)} title="Back 10s">
              <FiCornerLeftUp />
            </button>
            <button onClick={togglePlay} title="Play/Pause">
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
            <button onClick={() => skipTime(10)} title="Forward 10s">
              <FiCornerRightUp />
            </button>
            <button onClick={toggleMute} title="Mute">
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            </button>
            <button onClick={changeSpeed} title="Playback speed">
              {playbackRate}x
            </button>
            <button onClick={toggleLoop} title="Loop">
              <FiRotateCw className={loop ? "text-green-400" : ""} />
            </button>
            <button onClick={toggleFullScreen} title="Fullscreen">
              {isFullScreen ? <FiMinimize /> : <FiMaximize />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
