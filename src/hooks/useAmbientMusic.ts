import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 背景音乐播放器
 * 使用 HTML5 Audio 播放本地 MP3 文件，循环播放
 * - 渐入渐出，避免突兀
 * - 支持音量调节
 */
export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);

  /** 初始化 audio 元素（仅一次） */
  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;
    return audio;
  }, []);

  /** 启动音乐 */
  const play = useCallback(() => {
    const audio = ensureAudio();
    if (!audio) return;

    // 渐入
    audio.volume = 0;
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          // 渐入到目标音量
          const targetVol = volume;
          const fadeInterval = setInterval(() => {
            const next = Math.min(audio.volume + 0.04, targetVol);
            audio.volume = next;
            if (next >= targetVol) clearInterval(fadeInterval);
          }, 80);
          setIsPlaying(true);
        })
        .catch(() => {
          // 自动播放被拦截，下次用户点击再试
          setIsPlaying(false);
        });
    }
  }, [ensureAudio, volume]);

  /** 停止音乐 */
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 渐出后暂停
    const fadeInterval = setInterval(() => {
      const next = Math.max(audio.volume - 0.05, 0);
      audio.volume = next;
      if (next <= 0) {
        clearInterval(fadeInterval);
        audio.pause();
        setIsPlaying(false);
      }
    }, 60);
  }, []);

  /** 切换播放/暂停 */
  const toggle = useCallback(() => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
  }, [isPlaying, play, stop]);

  /** 调整音量 */
  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.volume = v;
    }
  }, [isPlaying]);

  // 卸载时清理
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, volume, toggle, changeVolume };
}
