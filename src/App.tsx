import StoriesContainer from "./components/Stories/StoriesContainer";
import { storyData } from "./data/mockData";
import { Camera, Home, Search, Heart, User } from "lucide-react";

function App() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-4 flex items-center justify-between bg-white">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Instagram Stories
        </h1>
        <div className="flex items-center space-x-4">
          <button className="focus:outline-none">
            <Heart size={24} className="text-gray-800" />
          </button>
          <button className="focus:outline-none">
            <User size={24} className="text-gray-800" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <StoriesContainer stories={storyData} />

        {/* Placeholder Feed Content */}
        <div className="max-w-screen-lg mx-auto px-4 mt-6">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={storyData[0].avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-3 font-medium">{storyData[0].username}</span>
            </div>
            <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
              <img
                src={storyData[0].items[0].url}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center mt-3 space-x-4">
              <Heart size={24} className="text-gray-800" />
              <Search size={24} className="text-gray-800" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={storyData[1].avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-3 font-medium">{storyData[1].username}</span>
            </div>
            <div className="aspect-w-4 aspect-h-3 rounded-md overflow-hidden">
              <img
                src={storyData[1].items[0].url}
                alt="Post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center mt-3 space-x-4">
              <Heart size={24} className="text-gray-800" />
              <Search size={24} className="text-gray-800" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-gray-200 py-3 px-8 bg-white">
        <div className="flex items-center justify-between">
          <button className="focus:outline-none">
            <Home size={24} className="text-gray-800" />
          </button>
          <button className="focus:outline-none">
            <Search size={24} className="text-gray-800" />
          </button>
          <button className="focus:outline-none p-2 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400">
            <Camera size={24} className="text-white" />
          </button>
          <button className="focus:outline-none">
            <Heart size={24} className="text-gray-800" />
          </button>
          <button className="focus:outline-none">
            <User size={24} className="text-gray-800" />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
