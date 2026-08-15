/**
 * Result Processor Utility
 * Processes Promise.allSettled results into consistent format
 * for component state management.
 */

/**
 * Process a single settled promise result
 * @param {Object} result - Settled promise result from Promise.allSettled
 * @returns {Object} - Processed result with status, data, and error fields
 */
export function processSettledResult(result) {
  if (result.status === 'fulfilled') {
    return {
      status: 'fulfilled',
      data: result.value,
      error: null,
    };
  } else {
    // Handle different types of errors
    let errorMessage = 'An unknown error occurred';
    
    if (result.reason instanceof Error) {
      errorMessage = result.reason.message;
    } else if (typeof result.reason === 'string') {
      errorMessage = result.reason;
    } else if (result.reason?.message) {
      errorMessage = result.reason.message;
    }

    return {
      status: 'rejected',
      data: null,
      error: errorMessage,
    };
  }
}

/**
 * Process all settled results and map them to specific keys
 * @param {Array} results - Array of settled promise results
 * @returns {Object} - Object with processed results mapped to keys
 */
export function processAllResults(results) {
  return {
    user: processSettledResult(results[0]),
    randomApi: processSettledResult(results[1]),
    failingApi: processSettledResult(results[2]),
  };
}