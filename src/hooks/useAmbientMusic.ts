import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 背景音乐播放器
 * 使用 HTML5 Audio 播放本地 MP3 文件，循环播放
 * - 渐入渐出，避免突兀
 * - 支持音量调节
 * - 完整的错误处理和加载状态
 * - 等音频加载完成才允许播放，避免 autoplay 被拦截
 */
export function useAmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  /** 初始化 audio 元素（仅一次） */
  const ensureAudio = useCallback(() => {
    if (audioRef.current) return audioRef.current;
    const audio = new Audio("/ambient.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audio.crossOrigin = "anonymous";

    // 加载错误
    audio.addEventListener("error", () => {
      const err = audio.error;
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
      console.error("[音乐]", msg, { code: err?.code, src: audio.src });
      setError(msg);
      setIsLoading(false);
      setIsReady(false);
      setIsPlaying(false);
    });

    // 加载完成，可以播放
    audio.addEventListener("canplaythrough", () => {
      console.log("[音乐] 音频加载完成，可以播放");
      setError(null);
      setIsLoading(false);
      setIsReady(true);
    });

    // 也监听 canplay，作为后备
    audio.addEventListener("canplay", () => {
      if (!isReady) {
        console.log("[音乐] canplay 触发，音频可以播放");
        setError(null);
        setIsLoading(false);
        setIsReady(true);
      }
    });

    audio.addEventListener("play", () => {
      console.log("[音乐] 开始播放");
    });

    audio.addEventListener("pause", () => {
      console.log("[音乐] 已暂停");
    });

    audio.addEventListener("waiting", () => {
      console.log("[音乐] 缓冲中...");
      setIsLoading(true);
    });

    audio.addEventListener("playing", () => {
      console.log("[音乐] 缓冲完成，继续播放");
      setIsLoading(false);
    });

    // 主动加载
    audio.load();
    audioRef.current = audio;
    return audio;
  }, []);

  /** 启动音乐 */
  const play = useCallback(() => {
    const audio = ensureAudio();
    if (!audio) return;

    // 如果还没加载完，会等 canplaythrough 后自动尝试播放
    if (!isReady) {
      console.log("[音乐] 音频还在加载，等加载完会自动播放");
      setIsLoading(true);
      const autoPlay = () => {
        audio.removeEventListener("canplaythrough", autoPlay);
        audio.volume = 0;
        const playPromise = audio.play();
        if (playPromise) {
          playPromise
            .then(() => {
              const targetVol = volume;
              const fadeInterval = setInterval(() => {
                const next = Math.min(audio.volume + 0.04, targetVol);
                audio.volume = next;
                if (next >= targetVol) clearInterval(fadeInterval);
              }, 80);
              setIsPlaying(true);
              setError(null);
            })
            .catch((err) => {
              console.error("[音乐] 自动播放失败:", err.name, err.message);
              setError("点击按钮重试");
              setIsPlaying(false);
            });
        }
      };
      audio.addEventListener("canplaythrough", autoPlay);
      return;
    }

    // 已加载，直接播放
    setError(null);
    audio.volume = 0;
    audio.currentTime = 0;

    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          const targetVol = volume;
          const fadeInterval = setInterval(() => {
            const next = Math.min(audio.volume + 0.04, targetVol);
            audio.volume = next;
            if (next >= targetVol) clearInterval(fadeInterval);
          }, 80);
          setIsPlaying(true);
          setError(null);
        })
        .catch((err) => {
          console.error("[音乐] play() 被拒绝:", err.name, err.message);
          let msg = "播放失败，请再次点击";
          if (err.name === "NotAllowedError") {
            msg = "浏览器拦截了播放，请再次点击按钮";
          } else if (err.name === "NotSupportedError") {
            msg = "音频格式不支持或文件损坏";
          }
          setError(msg);
          setIsPlaying(false);
        });
    }
  }, [ensureAudio, volume, isReady]);

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

  // 组件挂载时预加载音频
  useEffect(() => {
    ensureAudio();
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audioRef.current = null;
      }
    };
  }, [ensureAudio]);

  return { isPlaying, volume, toggle, changeVolume, error, isLoading, isReady };
}
