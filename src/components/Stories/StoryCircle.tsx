import React from "react";
import { Story } from "../../types";

interface StoryCircleProps {
  story: Story;
  onStoryClick: (storyId: string) => void;
  isActive: boolean;
}

const StoryCircle: React.FC<StoryCircleProps> = ({
  story,
  onStoryClick,
  isActive,
}) => {
  return (
    <div
      className="flex flex-col items-center mr-4 cursor-pointer transition-transform duration-200 hover:scale-105"
      onClick={() => onStoryClick(story.id)}
    >
      <div
        className={`relative w-16 h-16 rounded-full flex items-center justify-center p-0.5 mb-1
        ${
          isActive
            ? "bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400"
            : story.viewed
            ? "bg-gray-300"
            : "bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400"
        }`}
      >
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
          <img
            src={story.avatar}
            alt={story.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs mt-1 font-medium truncate max-w-[64px] text-center">
        {story.username}
      </span>
    </div>
  );
};

export default StoryCircle;
