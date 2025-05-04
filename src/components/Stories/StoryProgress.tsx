import React, { useEffect, useRef } from "react";

interface StoryProgressProps {
  count: number;
  currentIndex: number;
  duration: number;
  onComplete: () => void;
}

const StoryProgress: React.FC<StoryProgressProps> = ({
  count,
  currentIndex,
  duration,
  onComplete,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      if (progressRef.current) {
        progressRef.current.style.width = `${progress * 100}%`;
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex, duration, onComplete]);

  return (
    <div className="flex w-full gap-2 px-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`h-0.5 bg-white bg-opacity-30 relative flex-1`}
        >
          {index === currentIndex && (
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-white transition-width"
            />
          )}
          {index < currentIndex && (
            <div className="absolute top-0 left-0 h-full w-full bg-white" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StoryProgress;
