import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Story } from "../../types";
import StoryProgress from "./StoryProgress";

interface StoryViewerProps {
  stories: Story[];
  initialStoryId: string;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialStoryId,
  onClose,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(() => {
    return stories.findIndex((story) => story.id === initialStoryId);
  });

  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentStoryIndex];
  const currentItem = currentStory?.items[currentItemIndex];

  const navigateStories = useCallback(
    (direction: "prev" | "next") => {
      if (direction === "prev") {
        if (currentItemIndex > 0) {
          setCurrentItemIndex(currentItemIndex - 1);
        } else if (currentStoryIndex > 0) {
          setCurrentStoryIndex(currentStoryIndex - 1);
          setCurrentItemIndex(stories[currentStoryIndex - 1].items.length - 1);
        }
      } else {
        if (currentItemIndex < currentStory.items.length - 1) {
          setCurrentItemIndex(currentItemIndex + 1);
        } else if (currentStoryIndex < stories.length - 1) {
          setCurrentStoryIndex(currentStoryIndex + 1);
          setCurrentItemIndex(0);
        } else {
          onClose();
        }
      }
    },
    [
      currentItemIndex,
      currentStoryIndex,
      currentStory?.items.length,
      stories,
      onClose,
    ]
  );

  useEffect(() => {
    if (!isPaused && currentItem) {
      const timer = setTimeout(() => {
        navigateStories("next");
      }, currentItem.duration * 1000);

      return () => clearTimeout(timer);
    }
  }, [currentItem, isPaused, navigateStories]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigateStories("prev");
          break;
        case "ArrowRight":
          navigateStories("next");
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    },
    [navigateStories, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { width } = e.currentTarget.getBoundingClientRect();

    if (clientX < width * 0.3) {
      navigateStories("prev");
    } else if (clientX > width * 0.7) {
      navigateStories("next");
    }
  };

  const handleProgressComplete = () => {
    navigateStories("next");
  };

  if (!currentStory || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div
        className="absolute inset-0 w-full h-full flex flex-col"
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="w-full py-4 px-2 absolute top-0 z-10 bg-gradient-to-b from-black/60 to-transparent">
          <StoryProgress
            count={currentStory.items.length}
            currentIndex={currentItemIndex}
            duration={isPaused ? Infinity : currentItem.duration}
            onComplete={handleProgressComplete}
          />

          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                <img
                  src={currentStory.avatar}
                  alt={currentStory.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white font-medium ml-2">
                {currentStory.username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-white p-1 rounded-full hover:bg-white/10 transition"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <img
            src={currentItem.url}
            alt="Story content"
            className="w-full h-full object-contain max-h-screen"
          />
        </div>

        {currentStoryIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition"
            onClick={(e) => {
              e.stopPropagation();
              navigateStories("prev");
            }}
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {currentStoryIndex < stories.length - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/40 transition"
            onClick={(e) => {
              e.stopPropagation();
              navigateStories("next");
            }}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryViewer;
