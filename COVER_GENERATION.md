# Story Cover Generation System

## 📋 Overview
This feature adds automatic cover image generation for all stories in Booklish. Each story gets a beautiful, professionally designed cover image based on:
- Story emoji/symbol
- Story title
- Story genre colors (gradient backgrounds)

## 🎨 Features

### 1. **Cover Generation**
- Automatic image generation using Canvas API
- Gradient backgrounds based on story themes
- High-quality PNG output (1200x800px)
- Fallback UI for real-time display

### 2. **Integration Points**
- `src/lib/cover-generator.ts` - Core generation logic
- `src/lib/upload-covers.ts` - Supabase storage integration
- `src/lib/story-cover-attach.ts` - Story attachment utilities
- `src/hooks/useStoryCover.tsx` - React hook and component
- `src/components/booklish/StoryCoverDisplay.tsx` - UI components

### 3. **Type System**
- Updated `Story` interface with `coverImage` property
- Full TypeScript support throughout

## 🚀 Usage

### Generate Covers Locally
```bash
npm run generate:covers
```

### Generate and Upload to Supabase
```bash
npm run generate:covers:upload
```

### In React Components
```tsx
import { StoryCover } from "@/hooks/useStoryCover";
import { StoryCardWithCover } from "@/components/booklish/StoryCoverDisplay";

// Simple display
<StoryCover story={story} className="h-96" />

// In story cards
<StoryCardWithCover story={story} />

// Full grid
<StoryLibraryGrid stories={stories} columns={3} />
```

### Auto-initialization
Covers are automatically generated on app startup:
```tsx
import { initializeStoryCovers, StoryCoverCache } from "@/lib/story-cover-middleware";
import { stories } from "@/data/stories";

// In your app initialization
await initializeStoryCovers(stories);
await StoryCoverCache.initialize(stories);
```

## 📦 Dependencies
- `html-to-image` - Canvas-to-image conversion
- `@supabase/supabase-js` - Cloud storage (optional)

## 🎯 Architecture

```
User requests story
        ↓
useStoryCover hook
        ↓
Check if coverImage exists
        ↓
Yes → Use cached image
No → Generate cover
        ↓
Update story object
        ↓
Display StoryCover component
```

## 🌈 Color System
Tailwind gradient colors are automatically extracted and converted:
- `from-amber-200 to-amber-400` → `#fef08a` to `#fbbf24`
- Full support for 15+ color palettes

## 💾 Storage Options

### Option 1: In-Memory (Development)
Covers generated and cached in memory - no setup needed.

### Option 2: Supabase (Production)
1. Create bucket: `story-covers`
2. Set environment variables:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-key
   ```
3. Run: `npm run generate:covers:upload`

## ✨ Features Included
- ✅ Automatic cover generation
- ✅ Gradient backgrounds
- ✅ Emoji symbols
- ✅ Story titles with shadows
- ✅ Decorative elements
- ✅ Caching system
- ✅ React hooks integration
- ✅ UI components (display, cards, grid)
- ✅ TypeScript support
- ✅ Supabase integration
- ✅ Error handling

## 🔧 Configuration

### Image Size
Default: 1200x800px (2x pixel ratio for Retina displays)

Customize in `cover-generator.ts`:
```ts
const imageData = await generateStoryCover({
  emoji: story.cover,
  title: story.title,
  gradientFrom,
  gradientTo,
  width: 1600,  // Custom width
  height: 1000,  // Custom height
});
```

### Colors
Modify `extractGradientColors()` function to add custom colors.

## 🐛 Troubleshooting

### Covers not generating
- Ensure `html-to-image` is installed
- Check browser console for errors
- Verify DOM elements are properly mounted

### Upload fails
- Check Supabase credentials
- Ensure bucket exists and is public
- Check network connectivity

## 📝 Notes
- Covers are generated on-demand for better performance
- Memory caching reduces regeneration overhead
- Consider CDN caching for production use
- Keep emoji universal and meaningful

## 🎓 Next Steps
1. Run `npm install` to ensure `tsx` is available
2. Test with `npm run generate:covers`
3. Integrate components into story display pages
4. Monitor performance with large story counts
