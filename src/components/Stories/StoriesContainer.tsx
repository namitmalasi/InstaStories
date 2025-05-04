import React, { useState } from "react";
import StoryCircle from "./StoryCircle";
import StoryViewer from "./StoryViewer";
import { Story } from "../../types";

interface StoriesContainerProps {
  stories: Story[];
}

const StoriesContainer: React.FC<StoriesContainerProps> = ({ stories }) => {
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [viewedStories, setViewedStories] = useState<Set<string>>(new Set());

  const handleStoryClick = (storyId: string) => {
    setActiveStoryId(storyId);
  };

  const handleCloseViewer = () => {
    if (activeStoryId) {
      const updatedViewedStories = new Set(viewedStories);
      updatedViewedStories.add(activeStoryId);
      setViewedStories(updatedViewedStories);
    }
    setActiveStoryId(null);
  };

  const storyWithViewedState = stories.map((story) => ({
    ...story,
    viewed: viewedStories.has(story.id),
  }));

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="flex overflow-x-auto py-4 px-4 scrollbar-hide">
        <div className="flex">
          {storyWithViewedState.map((story) => (
            <StoryCircle
              key={story.id}
              story={story}
              onStoryClick={handleStoryClick}
              isActive={story.id === activeStoryId}
            />
          ))}
        </div>
      </div>

      {activeStoryId && (
        <StoryViewer
          stories={storyWithViewedState}
          initialStoryId={activeStoryId}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default StoriesContainer;
