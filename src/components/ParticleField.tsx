'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

/** 粒子数据源类型 */
export type ParticleSource =
  | { type: 'image'; src: string; sampleStep?: number }
  | { type: 'points'; points: Array<{ x: number; y: number; z?: number }> }
  | { type: 'text'; text: string; fontSize?: number; fontFamily?: string }
  | { type: 'grid'; cols: number; rows: number; spacing?: number }
  | { type: 'random'; count: number; spread?: number };

interface ParticleFieldProps {
  /** 粒子数据源 */
  source: ParticleSource;
  /** 粒子颜色，支持单色或渐变函数 */
  color?: string | ((index: number, total: number) => string);
  /** 背景颜色，null为透明 */
  backgroundColor?: string | null;
  /** 粒子大小 */
  particleSize?: number;
  /** 粒子聚合速度 (0-1) */
  speed?: number;
  /** 是否启用粒子交换动画 */
  enableSwap?: boolean;
  /** 粒子交换间隔（毫秒） */
  swapInterval?: number;
  /** 相机摇摆速度，0为禁用 */
  cameraSwaySpeed?: number;
  /** 相机摇摆幅度 */
  cameraSwayAmount?: number;
  /** 初始散布范围 */
  initialSpread?: number;
  /** 缩放比例 */
  scale?: number;
  /** 自定义类名 */
  className?: string;
  /** 粒子就位后的回调 */
  onSettled?: () => void;
}

export function ParticleField({
  source,
  color = '#FF6A00',
  backgroundColor = '#0B0E12',
  particleSize = 2,
  speed = 0.02,
  enableSwap = true,
  swapInterval = 100,
  cameraSwaySpeed = 5000,
  cameraSwayAmount = 100,
  initialSpread = 500,
  scale = 1,
  className = '',
  onSettled,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number>(0);
  const previousTimeRef = useRef<number>(0);
  const settledRef = useRef<boolean>(false);

  // 从图片提取点位
  const extractFromImage = useCallback(
    (image: HTMLImageElement, step: number = 2) => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      const imageData = ctx.getImageData(0, 0, image.width, image.height);

      const points: Array<{ x: number; y: number; z: number }> = [];
      for (let y = 0; y < imageData.height; y += step) {
        for (let x = 0; x < imageData.width; x += step) {
          const alpha = imageData.data[x * 4 + y * 4 * imageData.width + 3];
          if (alpha > 128) {
            points.push({
              x: (x - imageData.width / 2) * scale,
              y: (-y + imageData.height / 2) * scale,
              z: 0,
            });
          }
        }
      }
      return points;
    },
    [scale]
  );

  // 从文字提取点位
  const extractFromText = useCallback(
    (text: string, fontSize: number = 100, fontFamily: string = 'Arial') => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(text);
      const width = Math.ceil(metrics.width) + 20;
      const height = fontSize + 40;

      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = 'white';
      ctx.font = `bold ${fontSize}px ${fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, width / 2, height / 2);

      const imageData = ctx.getImageData(0, 0, width, height);
      const points: Array<{ x: number; y: number; z: number }> = [];
      const step = 3;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = imageData.data[x * 4 + y * 4 * width + 3];
          if (alpha > 128) {
            points.push({
              x: (x - width / 2) * scale,
              y: (-y + height / 2) * scale,
              z: 0,
            });
          }
        }
      }
      return points;
    },
    [scale]
  );

  // 生成网格点位
  const generateGrid = useCallback(
    (cols: number, rows: number, spacing: number = 10) => {
      const points: Array<{ x: number; y: number; z: number }> = [];
      const offsetX = ((cols - 1) * spacing) / 2;
      const offsetY = ((rows - 1) * spacing) / 2;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          points.push({
            x: (x * spacing - offsetX) * scale,
            y: (y * spacing - offsetY) * scale,
            z: 0,
          });
        }
      }
      return points;
    },
    [scale]
  );

  // 生成随机点位
  const generateRandom = useCallback(
    (count: number, spread: number = 200) => {
      const points: Array<{ x: number; y: number; z: number }> = [];
      for (let i = 0; i < count; i++) {
        // 球形分布
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = Math.cbrt(Math.random()) * spread * scale;

        points.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi) * 0.3, // 压扁Z轴
        });
      }
      return points;
    },
    [scale]
  );

  // 创建粒子系统
  const createParticles = useCallback(
    (targetPoints: Array<{ x: number; y: number; z: number }>) => {
      const scene = sceneRef.current;
      if (!scene || targetPoints.length === 0) return;

      // 清理旧粒子
      if (particlesRef.current) {
        scene.remove(particlesRef.current);
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }

      const positions: number[] = [];
      const colors: number[] = [];
      const destinations: Array<{ x: number; y: number; z: number }> = [];
      const speeds: number[] = [];

      const colorFn = typeof color === 'function' ? color : () => color;

      targetPoints.forEach((point, i) => {
        // 初始随机位置
        positions.push(
          (Math.random() - 0.5) * initialSpread * 2,
          (Math.random() - 0.5) * initialSpread * 2,
          -Math.random() * initialSpread
        );

        // 目标位置
        destinations.push({ x: point.x, y: point.y, z: point.z ?? 0 });

        // 速度（带随机性）
        speeds.push(speed * (0.5 + Math.random()));

        // 颜色
        const c = new THREE.Color(colorFn(i, targetPoints.length));
        colors.push(c.r, c.g, c.b);
      });

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      // 存储动画数据
      (
        geometry as THREE.BufferGeometry & {
          userData: {
            destinations: Array<{ x: number; y: number; z: number }>;
            speeds: number[];
          };
        }
      ).userData = { destinations, speeds };

      const material = new THREE.PointsMaterial({
        size: particleSize,
        vertexColors: true,
        sizeAttenuation: false,
      });

      const particles = new THREE.Points(geometry, material);
      particlesRef.current = particles;
      settledRef.current = false;
      scene.add(particles);
    },
    [color, particleSize, speed, initialSpread]
  );

  // 加载数据源
  const loadSource = useCallback(() => {
    switch (source.type) {
      case 'image': {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const points = extractFromImage(img, source.sampleStep ?? 2);
          createParticles(points);
        };
        img.src = source.src;
        break;
      }
      case 'text': {
        const points = extractFromText(source.text, source.fontSize, source.fontFamily);
        createParticles(points);
        break;
      }
      case 'points': {
        const points = source.points.map((p) => ({
          x: p.x * scale,
          y: p.y * scale,
          z: (p.z ?? 0) * scale,
        }));
        createParticles(points);
        break;
      }
      case 'grid': {
        const points = generateGrid(source.cols, source.rows, source.spacing);
        createParticles(points);
        break;
      }
      case 'random': {
        const points = generateRandom(source.count, source.spread);
        createParticles(points);
        break;
      }
    }
  }, [
    source,
    scale,
    extractFromImage,
    extractFromText,
    generateGrid,
    generateRandom,
    createParticles,
  ]);

  // 动画循环
  const animate = useCallback(
    (time: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const particles = particlesRef.current;
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const scene = sceneRef.current;

      if (!particles || !camera || !renderer || !scene) return;

      const geometry = particles.geometry as THREE.BufferGeometry & {
        userData: {
          destinations: Array<{ x: number; y: number; z: number }>;
          speeds: number[];
        };
      };
      const positions = geometry.attributes.position.array as Float32Array;
      const { destinations, speeds } = geometry.userData;

      let allSettled = true;
      const threshold = 0.5;

      // 更新粒子位置
      for (let i = 0; i < positions.length / 3; i++) {
        const idx = i * 3;
        const dest = destinations[i];
        const spd = speeds[i];

        const dx = dest.x - positions[idx];
        const dy = dest.y - positions[idx + 1];
        const dz = dest.z - positions[idx + 2];

        if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || Math.abs(dz) > threshold) {
          allSettled = false;
        }

        positions[idx] += dx * spd;
        positions[idx + 1] += dy * spd;
        positions[idx + 2] += dz * spd;
      }

      // 粒子就位回调
      if (allSettled && !settledRef.current) {
        settledRef.current = true;
        onSettled?.();
      }

      // 粒子交换动画
      if (enableSwap && time - previousTimeRef.current > swapInterval) {
        const count = positions.length / 3;
        if (count > 1) {
          const idx1 = Math.floor(Math.random() * count);
          const idx2 = Math.floor(Math.random() * count);
          if (idx1 !== idx2) {
            const temp = { ...destinations[idx1] };
            destinations[idx1] = { ...destinations[idx2] };
            destinations[idx2] = temp;
          }
        }
        previousTimeRef.current = time;
      }

      geometry.attributes.position.needsUpdate = true;

      // 相机摇摆
      if (cameraSwaySpeed > 0) {
        camera.position.x = Math.sin(time / cameraSwaySpeed) * cameraSwayAmount;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    },
    [enableSwap, swapInterval, cameraSwaySpeed, cameraSwayAmount, onSettled]
  );

  // 初始化
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: backgroundColor === null });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (backgroundColor) {
      renderer.setClearColor(new THREE.Color(backgroundColor));
    }
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 相机
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
    camera.position.set(0, 0, 300);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 加载数据源
    loadSource();

    // 开始动画
    animationRef.current = requestAnimationFrame(animate);

    // 响应式
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [backgroundColor, loadSource, animate]);

  return (
    <div ref={containerRef} className={`absolute inset-0 ${className}`} style={{ zIndex: 0 }} />
  );
}

export default ParticleField;
