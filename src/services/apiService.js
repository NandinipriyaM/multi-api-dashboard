/**
 * API Service
 * Handles all HTTP requests to external APIs.
 * Includes timeout handling, CORS-friendly endpoints, and fallback options.
 */

/**
 * Fetch data from a URL with timeout
 * @param {string} url - The endpoint URL
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} - Resolves with parsed JSON data
 * @throws {Error} - Throws error on non-200 status or network failure
 */
export async function fetchWithTimeout(url, timeout = 15000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
      // Don't set Content-Type for GET requests - this can cause CORS preflight
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout exceeded');
    }
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error or CORS issue - Failed to fetch');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch user data from JSONPlaceholder API
 * @returns {Promise<Object>} - User data object
 */
export async function fetchUserData() {
  const url = 'https://jsonplaceholder.typicode.com/users/1';
  return await fetchWithTimeout(url);
}

/**
 * Fetch random data from multiple fallback APIs
 * Tries multiple CORS-friendly APIs until one succeeds
 * @returns {Promise<Object>} - Random data object with API and Link keys
 */
export async function fetchRandomApiData() {
  // List of fallback APIs (all CORS-friendly)
  const fallbackApis = [
    {
      name: "JSONPlaceholder Posts",
      url: "https://jsonplaceholder.typicode.com/posts/1",
      transform: (data) => ({
        API: "JSONPlaceholder Posts API",
        Description: data.title || "Sample post",
        Link: "https://jsonplaceholder.typicode.com",
        postId: data.id,
        userId: data.userId,
        body: data.body
      })
    },
    {
      name: "JSONPlaceholder Todos",
      url: "https://jsonplaceholder.typicode.com/todos/1",
      transform: (data) => ({
        API: "JSONPlaceholder Todos API",
        Description: data.title || "Sample todo",
        Link: "https://jsonplaceholder.typicode.com",
        todoId: data.id,
        userId: data.userId,
        completed: data.completed
      })
    },
    {
      name: "JSONPlaceholder Comments",
      url: "https://jsonplaceholder.typicode.com/comments/1",
      transform: (data) => ({
        API: "JSONPlaceholder Comments API",
        Description: data.body || "Sample comment",
        Link: "https://jsonplaceholder.typicode.com",
        commentId: data.id,
        email: data.email
      })
    },
    {
      name: "GitHub API",
      url: "https://api.github.com/users/octocat",
      transform: (data) => ({
        API: "GitHub Users API",
        Description: data.bio || "GitHub user",
        Link: data.html_url || "https://github.com",
        login: data.login,
        followers: data.followers,
        publicRepos: data.public_repos
      })
    }
  ];

  // Try each API until one succeeds
  for (const api of fallbackApis) {
    try {
      const data = await fetchWithTimeout(api.url);
      console.log(`Successfully fetched from ${api.name}`);
      return api.transform(data);
    } catch (error) {
      console.warn(`Failed to fetch from ${api.name}:`, error.message);
      // Continue to next fallback
    }
  }

  // If all APIs fail, throw a descriptive error
  throw new Error('All random API fallbacks failed. Please check your internet connection.');
}

/**
 * Fetch data from failing endpoint (intentionally)
 * @returns {Promise<Object>} - This will always throw an error
 */
export async function fetchFailingApiData() {
  const url = 'https://jsonplaceholder.typicode.com/posts/invalid-endpoint';
  return await fetchWithTimeout(url);
}

/**
 * Fetch all API data simultaneously using Promise.allSettled
 * @returns {Promise<Array>} - Array of settled promise results
 */
export async function fetchAllApiData() {
  const promises = [
    fetchUserData(),
    fetchRandomApiData(),
    fetchFailingApiData(),
  ];

  return await Promise.allSettled(promises);
}