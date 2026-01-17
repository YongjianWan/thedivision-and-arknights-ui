'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '../lib/utils';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [_isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [text, speed, onComplete]);

  useEffect(() => {
    const delayTimeout = setTimeout(startTyping, delay);
    return () => clearTimeout(delayTimeout);
  }, [delay, startTyping]);

  // 光标闪烁
  useEffect(() => {
    if (!cursor) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={cn('font-tactical', className)}>
      {displayText}
      {cursor && (
        <span
          className={cn(
            'inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle',
            showCursor ? 'opacity-100' : 'opacity-0'
          )}
          style={{ transition: 'opacity 0.1s' }}
        />
      )}
    </span>
  );
}

// 多行打字机，一行一行出现
interface TypewriterLinesProps {
  lines: string[];
  speed?: number;
  lineDelay?: number;
  className?: string;
  lineClassName?: string;
}

export function TypewriterLines({
  lines,
  speed = 40,
  lineDelay = 200,
  className,
  lineClassName,
}: TypewriterLinesProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [completedLines, setCompletedLines] = useState<string[]>([]);

  const handleLineComplete = useCallback(() => {
    setCompletedLines((prev) => [...prev, lines[currentLine]]);
    if (currentLine < lines.length - 1) {
      setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, lineDelay);
    }
  }, [currentLine, lines, lineDelay]);

  return (
    <div className={cn('space-y-1', className)}>
      {completedLines.map((line, i) => (
        <div key={i} className={cn('text-[var(--text-secondary)]', lineClassName)}>
          {line}
        </div>
      ))}
      {currentLine < lines.length && (
        <Typewriter
          key={currentLine}
          text={lines[currentLine]}
          speed={speed}
          onComplete={handleLineComplete}
          className={lineClassName}
        />
      )}
    </div>
  );
}
