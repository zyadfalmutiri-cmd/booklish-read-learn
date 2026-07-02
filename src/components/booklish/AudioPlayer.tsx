import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
  duration?: number;
  onEnded?: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

export function AudioPlayer({ audioUrl, duration, onEnded }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(duration ?? 0);
  const [speedIndex, setSpeedIndex] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setTotalDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const seek = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), totalDuration);
  };

  const handleSeekBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const time = Number(e.target.value);
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const cycleSpeed = () => {
    const nextIndex = (speedIndex + 1) % SPEEDS.length;
    setSpeedIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.playbackRate = SPEEDS[nextIndex];
    }
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full rounded-2xl bg-white shadow-md p-5 flex flex-col gap-4" dir="ltr">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <input
        type="range"
        min={0}
        max={totalDuration || 0}
        value={currentTime}
        onChange={handleSeekBar}
        className="w-full accent-emerald-600"
      />

      <div className="flex justify-between text-sm text-gray-500 font-mono">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(totalDuration)}</span>
      </div>

      <div className="flex items-center justify-center gap-6">
        <button onClick={() => seek(-10)} className="text-gray-600 hover:text-emerald-600">
          <RotateCcw size={22} />
        </button>

        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition"
        >
          {isPlaying ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
        </button>

        <button onClick={() => seek(10)} className="text-gray-600 hover:text-emerald-600">
          <RotateCw size={22} />
        </button>
      </div>

      <button
        onClick={cycleSpeed}
        className="mx-auto text-sm font-medium text-gray-500 border border-gray-300 rounded-full px-3 py-1 hover:bg-gray-50"
      >
        {SPEEDS[speedIndex]}x
      </button>
    </div>
  );
}
