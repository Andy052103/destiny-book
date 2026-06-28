import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 背景音乐播放器
 * 使用 HTML5 Audio 播放本地 MP3 文件，循环播放
 * - 渐入渐出，避免突兀
 * - 支持音量调节
 * - 完整的错误处理和日志
 */
export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [error, setError] = useState<string | null>(null);

  /** 初始化 audio 元素（仅一次） */
  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    // 监听加载错误
    audio.addEventListener("error", (e) => {
      const target = e.target as HTMLAudioElement;
      const err = target.error;
      let msg = "音频加载失败";
      if (err) {
        switch (err.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            msg = "音频加载被中止";
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            msg = "网络错误，音频加载失败";
            break;
          case MediaError.MEDIA_ERR_DECODE:
            msg = "音频解码失败（文件可能损坏）";
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            msg = "音频格式不支持或路径错误";
            break;
        }
      }
      console.error("[音乐]", msg, { code: err?.code, src: target.src });
      setError(msg);
      setIsPlaying(false);
    });

    audio.addEventListener("canplaythrough", () => {
      console.log("[音乐] 音频加载完成，可以播放");
      setError(null);
    });

    audio.addEventListener("play", () => {
      console.log("[音乐] 开始播放");
    });

    audio.addEventListener("pause", () => {
      console.log("[音乐] 已暂停");
    });

    audioRef.current = audio;
    return audio;
  }, []);

  /** 启动音乐 */
  const play = useCallback(() => {
    const audio = ensureAudio();
    if (!audio) return;

    setError(null);
    audio.volume = 0;
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          console.log("[音乐] play() 成功");
          const targetVol = volume;
          const fadeInterval = setInterval(() => {
            const next = Math.min(audio.volume + 0.04, targetVol);
            audio.volume = next;
            if (next >= targetVol) clearInterval(fadeInterval);
          }, 80);
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("[音乐] play() 被拒绝:", err.name, err.message);
          let msg = "播放失败";
          if (err.name === "NotAllowedError") {
            msg = "浏览器拦截了自动播放，请再次点击按钮";
          } else if (err.name === "NotSupportedError") {
            msg = "音频格式不支持或文件损坏";
          }
          setError(msg);
          setIsPlaying(false);
        });
    }
  }, [ensureAudio, volume]);

  /** 停止音乐 */
  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

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

  return { isPlaying, volume, toggle, changeVolume, error };
}
