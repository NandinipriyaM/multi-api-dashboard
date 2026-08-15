# Multi-API Dashboard

A resilient React dashboard that fetches data from three APIs simultaneously using `Promise.allSettled`, handling failures gracefully.

## Features
- Fetches 3 APIs concurrently
- Individual loading, success, and error states per panel
- Graceful error handling (one failure doesn't break others)
- Responsive grid layout
- Refetch button

## Setup and Running Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:3000

## APIs Used
| API | Endpoint | Status |
|-----|----------|--------|
| User Data | `jsonplaceholder.typicode.com/users/1` | ✅ Working |
| Random API | `jsonplaceholder.typicode.com/posts/1` | ✅ Working |
| Failing API | `jsonplaceholder.typicode.com/posts/invalid-endpoint` | ❌ 404 |

## Promise.all vs. Promise.allSettled Analysis

**Promise.all**: Fails fast if any promise rejects. Entire operation fails.

**Promise.allSettled**: Waits for all promises to settle (fulfilled or rejected). Returns results with status for each. Perfect for independent API calls where one failure shouldn't affect others.

## Tech Stack
- React 18
- Vite
- CSS3