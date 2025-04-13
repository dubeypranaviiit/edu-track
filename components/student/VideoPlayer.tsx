// // "use client";
// // import { useRef, useState, useEffect } from "react";
// // import {
// //   FiPause,
// //   FiPlay,
// //   FiVolume2,
// //   FiMaximize,
// //   FiMinimize,
// //   FiRotateCcw,
// //   FiRewind,
// //   FiFastForward,
// // } from "react-icons/fi";

// // const formatTime = (time: number) => {
// //   const minutes = Math.floor(time / 60);
// //   const seconds = Math.floor(time % 60).toString().padStart(2, "0");
// //   return `${minutes}:${seconds}`;
// // };

// // const VideoPlayer = () => {
// //   const videoRef = useRef<HTMLVideoElement>(null);
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [duration, setDuration] = useState(0);
// //   const [isFullScreen, setIsFullScreen] = useState(false);
// //   const [playbackRate, setPlaybackRate] = useState(1);
// //   const [isLooping, setIsLooping] = useState(false);

// //   useEffect(() => {
// //     const video = videoRef.current;
// //     if (!video) return;

// //     const handleTimeUpdate = () => setCurrentTime(video.currentTime);
// //     const handleLoadedMetadata = () => setDuration(video.duration);

// //     video.addEventListener("timeupdate", handleTimeUpdate);
// //     video.addEventListener("loadedmetadata", handleLoadedMetadata);

// //     return () => {
// //       video.removeEventListener("timeupdate", handleTimeUpdate);
// //       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
// //     };
// //   }, []);

// //   const togglePlay = () => {
// //     const video = videoRef.current;
// //     if (!video) return;
// //     isPlaying ? video.pause() : video.play();
// //     setIsPlaying(!isPlaying);
// //   };

// //   const toggleFullScreen = () => {
// //     const video = videoRef.current;
// //     if (!video) return;

// //     if (!document.fullscreenElement) {
// //       video.requestFullscreen();
// //       setIsFullScreen(true);
// //     } else {
// //       document.exitFullscreen();
// //       setIsFullScreen(false);
// //     }
// //   };

// //   const skipTime = (seconds: number) => {
// //     const video = videoRef.current;
// //     if (!video) return;
// //     video.currentTime = Math.min(Math.max(0, video.currentTime + seconds), duration);
// //   };

// //   const changePlaybackRate = () => {
// //     const newRate = playbackRate >= 2 ? 0.5 : playbackRate + 0.5;
// //     setPlaybackRate(newRate);
// //     if (videoRef.current) videoRef.current.playbackRate = newRate;
// //   };

// //   const toggleLoop = () => {
// //     setIsLooping((prev) => {
// //       if (videoRef.current) videoRef.current.loop = !prev;
// //       return !prev;
// //     });
// //   };

// //   return (
// //     <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
// //       <video
// //         ref={videoRef}
// //         className="w-full h-full object-cover"
// //         src="https://www.w3schools.com/html/mov_bbb.mp4"
// //         controls={false}
// //         loop={isLooping}
// //       />
// //       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 p-3 text-white">
// //         <div className="flex flex-wrap items-center justify-between gap-3">
// //           <div className="flex items-center space-x-2">
// //             <button onClick={() => skipTime(-10)} className="p-2 hover:bg-white/30 rounded-full">
// //               <FiRewind />
// //             </button>
// //             <button onClick={togglePlay} className="p-2 hover:bg-white/30 rounded-full">
// //               {isPlaying ? <FiPause /> : <FiPlay />}
// //             </button>
// //             <button onClick={() => skipTime(10)} className="p-2 hover:bg-white/30 rounded-full">
// //               <FiFastForward />
// //             </button>
// //             <button onClick={toggleLoop} className={`p-2 rounded-full ${isLooping ? "bg-blue-500" : "hover:bg-white/30"}`}>
// //               <FiRotateCcw />
// //             </button>
// //             <button onClick={changePlaybackRate} className="text-sm px-3 py-1 rounded bg-white/20 hover:bg-white/30">
// //               {playbackRate}x
// //             </button>
// //           </div>

// //           <div className="flex items-center space-x-2">
// //             <span className="text-xs font-mono">
// //               {formatTime(currentTime)} / {formatTime(duration)}
// //             </span>
// //             <button className="p-2 hover:bg-white/30 rounded-full">
// //               <FiVolume2 />
// //             </button>
// //             <button onClick={toggleFullScreen} className="p-2 hover:bg-white/30 rounded-full">
// //               {isFullScreen ? <FiMinimize /> : <FiMaximize />}
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VideoPlayer;
// "use client";
// import { useEffect, useRef, useState } from "react";
// import {
//   FiPause,
//   FiPlay,
//   FiVolume2,
//   FiVolumeX,
//   FiMaximize,
//   FiMinimize,
//   FiRotateCw,
//   FiCornerLeftUp,
//   FiCornerRightUp,
// } from "react-icons/fi";

// const formatTime = (time: number) => {
//   const minutes = Math.floor(time / 60)
//     .toString()
//     .padStart(2, "0");
//   const seconds = Math.floor(time % 60)
//     .toString()
//     .padStart(2, "0");
//   return `${minutes}:${seconds}`;
// };

// const VideoPlayer = ({ src }: { src: string }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [duration, setDuration] = useState(0);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [loop, setLoop] = useState(false);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const updateTime = () => setCurrentTime(video.currentTime);
//     video.addEventListener("timeupdate", updateTime);

//     return () => {
//       video.removeEventListener("timeupdate", updateTime);
//     };
//   }, []);

//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     if (isPlaying) {
//       video.pause();
//     } else {
//       video.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleFullScreen = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (!document.fullscreenElement) {
//       video.requestFullscreen();
//       setIsFullScreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullScreen(false);
//     }
//   };

//   const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const video = videoRef.current;
//     if (!video) return;
//     const newTime = parseFloat(e.target.value);
//     video.currentTime = newTime;
//     setCurrentTime(newTime);
//   };

//   const skipTime = (seconds: number) => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.currentTime += seconds;
//   };

//   const toggleMute = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.muted = !video.muted;
//     setIsMuted(video.muted);
//   };

//   const changeSpeed = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     const newRate = playbackRate === 2 ? 0.5 : playbackRate + 0.5;
//     video.playbackRate = newRate;
//     setPlaybackRate(newRate);
//   };

//   const toggleLoop = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.loop = !video.loop;
//     setLoop(video.loop);
//   };

//   const handleLoadedMetadata = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     setDuration(video.duration);
//   };

//   return (
//     <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         src={src}
//         onLoadedMetadata={handleLoadedMetadata}
//         loop={loop}
//       />
//       <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/30 p-4 text-white space-y-2">
//         {/* Seek Bar */}
//         <input
//           type="range"
//           min="0"
//           max={duration}
//           step="0.1"
//           value={currentTime}
//           onChange={handleSeek}
//           className="w-full accent-blue-500"
//         />

//         <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
//           {/* Time Info */}
//           <div className="flex items-center space-x-2 mb-2 sm:mb-0">
//             <span>{formatTime(currentTime)}</span>
//             <span>/</span>
//             <span>{formatTime(duration)}</span>
//             <span className="text-gray-400">({formatTime(duration - currentTime)} left)</span>
//           </div>

//           {/* Controls */}
//           <div className="flex items-center space-x-3">
//             <button onClick={() => skipTime(-10)}><FiCornerLeftUp /></button>
//             <button onClick={togglePlay}>{isPlaying ? <FiPause /> : <FiPlay />}</button>
//             <button onClick={() => skipTime(10)}><FiCornerRightUp /></button>
//             <button onClick={toggleMute}>{isMuted ? <FiVolumeX /> : <FiVolume2 />}</button>
//             <button onClick={changeSpeed} title="Playback speed">{playbackRate}x</button>
//             <button onClick={toggleLoop} title="Loop">
//               <FiRotateCw className={loop ? "text-green-400" : ""} />
//             </button>
//             <button onClick={toggleFullScreen}>
//               {isFullScreen ? <FiMinimize /> : <FiMaximize />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;
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
