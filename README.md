# Instagram Stories Clone

A React-based implementation of Instagram Stories feature.

Live Demo:[https://famous-dolphin-7947a2.netlify.app/](https://famous-dolphin-7947a2.netlify.app/)

## Features

- 📱 Story circles with viewed/unviewed states
- ⏱️ Auto-progression after 5 seconds
- ⏯️ Pause on hover functionality
- 🎯 Progress indicator for each story
- ⌨️ Keyboard navigation support
- 📱 Responsive design
- 🖱️ Click navigation areas
- 🎨 Instagram-like UI/UX

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/namitmalasi/InstaStories
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

- Click on any story circle to view stories
- Navigate between stories:
  - Click left/right sides of the screen
  - Use left/right arrow keys
  - Click the navigation arrows
- Press ESC to exit story view
- Hover over the story to pause auto-progression
- Story progress is indicated by the bars at the top

## Project Structure

```
src/
├── components/
│   └── Stories/
│       ├── StoriesContainer.tsx
│       ├── StoryCircle.tsx
│       ├── StoryProgress.tsx
│       └── StoryViewer.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```
