import React from 'react';
import './DataPanel.css';

/**
 * DataPanel Component
 * Presentational component that renders the UI for a single data source.
 * Handles three states: loading, fulfilled, and rejected.
 * 
 * @param {Object} props
 * @param {string} props.title - Title of the panel
 * @param {string} props.status - Status: 'loading', 'fulfilled', or 'rejected'
 * @param {Object} props.data - Data object when fulfilled
 * @param {string} props.error - Error message when rejected
 * @param {string} props.panelId - Unique identifier for the panel
 */
const DataPanel = ({ title, status, data, error, panelId }) => {
  /**
   * Renders the appropriate content based on the current status
   * @returns {JSX.Element} - Conditional UI based on status
   */
  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div 
            data-testid={`panel-${panelId}-loading`}
            className="panel-content loading-content"
            role="status"
            aria-label={`${title} is loading`}
          >
            <div className="spinner"></div>
            <span>Loading...</span>
          </div>
        );
      
      case 'fulfilled':
        return (
          <div 
            data-testid={`panel-${panelId}-success`}
            className="panel-content success-content"
            role="contentinfo"
            aria-label={`${title} loaded successfully`}
          >
            <div className="success-badge">✓ Success</div>
            <pre className="data-display">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
      
      case 'rejected':
        return (
          <div 
            data-testid={`panel-${panelId}-error`}
            className="panel-content error-content"
            role="alert"
            aria-label={`${title} failed to load`}
          >
            <div className="error-badge">✗ Failed</div>
            <p className="error-message">
              <strong>Error:</strong> {error}
            </p>
            <p className="error-hint">
              This demonstrates that the application continues to function even when one API fails.
            </p>
          </div>
        );
      
      default:
        return (
          <div 
            data-testid={`panel-${panelId}-loading`}
            className="panel-content loading-content"
            role="status"
          >
            Loading...
          </div>
        );
    }
  };

  return (
    <div 
      className="panel" 
      data-testid={`panel-${panelId}`}
      role="article"
    >
      <div className="panel-header">
        <h3 className="panel-title">{title}</h3>
        <span className={`status-indicator status-${status}`}></span>
      </div>
      {renderContent()}
    </div>
  );
};

export default DataPanel;