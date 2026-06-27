import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 黑金神秘风氛围音乐生成器
 * 使用 Web Audio API 实时合成，无需外部音频文件
 * - 低沉的 drone 弦乐底色
 * - 空灵的钟声点缀（五声音阶）
 * - 缓慢的呼吸感音量起伏
 */
export function useAmbientMusic() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode }[]>([]);
  const bellTimerRef = useRef<number | null>(null);
  const breatheTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.35);

  // 五声音阶频率（A 小调五声），神秘悠远
  const pentatonicScale = [
    220.0, // A3
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.0, // G4
    440.0, // A4
    523.25, // C5
    587.33, // D5
  ];

  /** 创建并启动 drone 底色（三个低频振荡器叠加） */
  const startDrone = useCallback((ctx: AudioContext, master: GainNode) => {
    // 根音 A2 + 纯五度 E3 + 八度 A3，形成低沉的持续和弦
    const droneFreqs = [110.0, 164.81, 220.0];
    const droneTypes: OscillatorType[] = ["sine", "triangle", "sine"];

    droneFreqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = droneTypes[i];
      osc.frequency.value = freq;

      // 轻微失谐增加厚度
      osc.detune.value = (i - 1) * 4;

      // 每个 drone 的增益不同，避免过响
      const droneLevel = 0.12 / (i + 1);
      gain.gain.value = 0;
      gain.gain.linearRampToValueAtTime(droneLevel, ctx.currentTime + 3);

      // 低通滤波，让音色更暖
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;
      filter.Q.value = 0.8;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start();
      droneNodesRef.current.push({ osc, gain });
    });
  }, []);

  /** 播放一声钟声（带衰减包络） */
  const playBell = useCallback(
    (ctx: AudioContext, master: GainNode, freq: number, delay: number) => {
      const startTime = ctx.currentTime + delay;

      // 主音 + 谐波，模拟金属钟声
      const harmonics = [
        { ratio: 1, level: 1.0, decay: 4.5 },
        { ratio: 2.76, level: 0.4, decay: 3.0 },
        { ratio: 5.4, level: 0.25, decay: 2.0 },
      ];

      harmonics.forEach((h) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.value = freq * h.ratio;

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(h.level * 0.08, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          startTime + h.decay
        );

        osc.connect(gain);
        gain.connect(master);

        osc.start(startTime);
        osc.stop(startTime + h.decay + 0.1);
      });
    },
    []
  );

  /** 定时触发钟声序列 */
  const scheduleBells = useCallback(
    (ctx: AudioContext, master: GainNode) => {
      const tick = () => {
        // 随机选 1-3 个音符，间隔随机
        const noteCount = Math.random() < 0.3 ? 3 : Math.random() < 0.6 ? 2 : 1;
        for (let i = 0; i < noteCount; i++) {
          const note =
            pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
          const delay = i * (0.8 + Math.random() * 1.2);
          playBell(ctx, master, note, delay);
        }
        // 下一次钟声：6-14 秒后
        const nextDelay = 6000 + Math.random() * 8000;
        bellTimerRef.current = window.setTimeout(tick, nextDelay);
      };

      // 首次钟声 4 秒后
      bellTimerRef.current = window.setTimeout(tick, 4000);
    },
    [playBell]
  );

  /** 呼吸感音量起伏 */
  const startBreathing = useCallback((ctx: AudioContext, master: GainNode) => {
    const breathe = () => {
      const now = ctx.currentTime;
      // 8 秒一个呼吸周期：渐强 → 渐弱
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(volume * 1.3, now + 4);
      master.gain.linearRampToValueAtTime(volume * 0.7, now + 8);

      breatheTimerRef.current = window.setTimeout(breathe, 8000);
    };
    breathe();
  }, [volume]);

  /** 启动音乐 */
  const play = useCallback(() => {
    if (audioCtxRef.current) return; // 已在播放

    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    audioCtxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterGainRef.current = master;

    // 渐入
    master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 2);

    startDrone(ctx, master);
    scheduleBells(ctx, master);
    startBreathing(ctx, master);

    setIsPlaying(true);
  }, [volume, startDrone, scheduleBells, startBreathing]);

  /** 停止音乐 */
  const stop = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    // 渐出后停止
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.5);

    // 清除定时器
    if (bellTimerRef.current) {
      clearTimeout(bellTimerRef.current);
      bellTimerRef.current = null;
    }
    if (breatheTimerRef.current) {
      clearTimeout(breatheTimerRef.current);
      breatheTimerRef.current = null;
    }

    // 1.5 秒后真正停止振荡器
    setTimeout(() => {
      droneNodesRef.current.forEach(({ osc }) => {
        try {
          osc.stop();
        } catch {
          // 已停止
        }
      });
      droneNodesRef.current = [];
      ctx.close();
      audioCtxRef.current = null;
      masterGainRef.current = null;
    }, 1600);

    setIsPlaying(false);
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
    const master = masterGainRef.current;
    const ctx = audioCtxRef.current;
    if (master && ctx) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setTargetAtTime(v, ctx.currentTime, 0.3);
    }
  }, []);

  // 卸载时清理
  useEffect(() => {
    return () => {
      if (bellTimerRef.current) clearTimeout(bellTimerRef.current);
      if (breatheTimerRef.current) clearTimeout(breatheTimerRef.current);
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return { isPlaying, volume, toggle, changeVolume };
}
