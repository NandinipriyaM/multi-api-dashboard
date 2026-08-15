import { useState, useEffect, useCallback } from 'react';
import { fetchAllApiData } from '../services/apiService';
import { processAllResults } from '../utils/resultProcessor';

/**
 * Custom Hook: useApiData
 * Manages the fetching and state management for all API data.
 * Uses Promise.allSettled to handle multiple API calls resiliently.
 * 
 * @returns {Object} - Contains apiData state, refetch function, and loading state
 */
export function useApiData() {
  // Initial state with all APIs in loading status
  const [apiData, setApiData] = useState({
    user: { status: 'loading', data: null, error: null },
    randomApi: { status: 'loading', data: null, error: null },
    failingApi: { status: 'loading', data: null, error: null },
  });

  const [isRefetching, setIsRefetching] = useState(false);

  /**
   * Fetch all API data and update state
   */
  const fetchData = useCallback(async () => {
    setIsRefetching(true);
    
    try {
      // Use Promise.allSettled to handle all promises regardless of success/failure
      const results = await fetchAllApiData();
      
      // Process results and update state
      const processedData = processAllResults(results);
      
      setApiData(processedData);
    } catch (error) {
      // This should rarely happen as allSettled doesn't reject
      console.error('Unexpected error fetching API data:', error);
      
      // Set all to error state
      setApiData({
        user: { status: 'rejected', data: null, error: 'Failed to fetch data' },
        randomApi: { status: 'rejected', data: null, error: 'Failed to fetch data' },
        failingApi: { status: 'rejected', data: null, error: 'Failed to fetch data' },
      });
    } finally {
      setIsRefetching(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    apiData,
    refetch: fetchData,
    isRefetching,
  };
}