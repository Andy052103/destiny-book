import { useCallback, useEffect, useRef, useState } from "react";

/**
 * 黑金神秘风氛围音乐生成器（轻盈版）
 * 使用 Web Audio API 实时合成，无需外部音频文件
 * - 单个柔和 pad 底色（带滤波器缓慢扫描）
 * - 偶尔点缀的清脆高音（如风铃/星辉）
 * - 整体薄而透，像薄雾轻烟
 */
export function useAmbientMusic() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const padNodesRef = useRef<{ osc: OscillatorNode; gain: GainNode; filter: BiquadFilterNode } | null>(null);
  const sparkleTimerRef = useRef<number | null>(null);
  const sweepTimerRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);

  // 高音点缀音阶（A 小调五声高音区），清脆如风铃
  const sparkleScale = [
    659.25, // E5
    783.99, // G5
    880.0,  // A5
    1046.5, // C6
    1318.51, // E6
  ];

  /** 创建并启动 pad 底色（单音柔和弦） */
  const startPad = useCallback((ctx: AudioContext, master: GainNode) => {
    // 根音 A3，柔和正弦波
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.value = 220.0; // A3
    osc.detune.value = 0;

    // 带通滤波，让音色清澈透明
    filter.type = "lowpass";
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    // 缓慢渐入
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 4);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc.start();
    padNodesRef.current = { osc, gain, filter };
  }, []);

  /** 滤波器缓慢扫描，制造空间感 */
  const startSweep = useCallback((ctx: AudioContext, filter: BiquadFilterNode) => {
    const sweep = () => {
      const now = ctx.currentTime;
      // 12 秒一个周期：滤波频率在 400-1200 之间缓慢摆动
      const targetFreq = 400 + Math.random() * 800;
      filter.frequency.cancelScheduledValues(now);
      filter.frequency.setValueAtTime(filter.frequency.value, now);
      filter.frequency.linearRampToValueAtTime(targetFreq, now + 12);

      sweepTimerRef.current = window.setTimeout(sweep, 12000);
    };
    sweep();
  }, []);

  /** 播放一声清脆点缀（如风铃/星辉） */
  const playSparkle = useCallback(
    (ctx: AudioContext, master: GainNode, freq: number, delay: number) => {
      const startTime = ctx.currentTime + delay;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      // 极短衰减，清脆如水滴
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.06, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.5);

      osc.connect(gain);
      gain.connect(master);

      osc.start(startTime);
      osc.stop(startTime + 1.6);
    },
    []
  );

  /** 定时点缀星辉音 */
  const scheduleSparkles = useCallback(
    (ctx: AudioContext, master: GainNode) => {
      const tick = () => {
        // 60% 概率只响一声，30% 两声，10% 三声
        const r = Math.random();
        const noteCount = r < 0.6 ? 1 : r < 0.9 ? 2 : 3;
        for (let i = 0; i < noteCount; i++) {
          const note = sparkleScale[Math.floor(Math.random() * sparkleScale.length)];
          const delay = i * (1.5 + Math.random() * 1.5);
          playSparkle(ctx, master, note, delay);
        }
        // 下一次点缀：10-20 秒后（稀疏，不抢戏）
        const nextDelay = 10000 + Math.random() * 10000;
        sparkleTimerRef.current = window.setTimeout(tick, nextDelay);
      };

      // 首次点缀 6 秒后（让 pad 先铺好底）
      sparkleTimerRef.current = window.setTimeout(tick, 6000);
    },
    [playSparkle]
  );

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
    master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 3);

    startPad(ctx, master);

    // pad 创建后启动滤波扫描
    if (padNodesRef.current) {
      startSweep(ctx, padNodesRef.current.filter);
    }

    scheduleSparkles(ctx, master);

    setIsPlaying(true);
  }, [volume, startPad, startSweep, scheduleSparkles]);

  /** 停止音乐 */
  const stop = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    // 渐出后停止
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + 1.2);

    // 清除定时器
    if (sparkleTimerRef.current) {
      clearTimeout(sparkleTimerRef.current);
      sparkleTimerRef.current = null;
    }
    if (sweepTimerRef.current) {
      clearTimeout(sweepTimerRef.current);
      sweepTimerRef.current = null;
    }

    // 1.3 秒后真正停止振荡器
    setTimeout(() => {
      if (padNodesRef.current) {
        try {
          padNodesRef.current.osc.stop();
        } catch {
          // 已停止
        }
        padNodesRef.current = null;
      }
      ctx.close();
      audioCtxRef.current = null;
      masterGainRef.current = null;
    }, 1400);

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
      if (sparkleTimerRef.current) clearTimeout(sparkleTimerRef.current);
      if (sweepTimerRef.current) clearTimeout(sweepTimerRef.current);
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
