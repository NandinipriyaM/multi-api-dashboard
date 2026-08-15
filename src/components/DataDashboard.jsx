import React from 'react';
import DataPanel from './DataPanel';
import { useApiData } from '../hooks/useApiData';
import './DataDashboard.css';

/**
 * DataDashboard Component
 * Main container component that manages the state and data fetching logic.
 * Renders three DataPanel components for each API data source.
 */
const DataDashboard = () => {
  const { apiData, refetch, isRefetching } = useApiData();

  return (
    <div className="dashboard" role="main">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Multi-API Dashboard</h1>
        <button 
          className="refetch-button"
          onClick={refetch}
          disabled={isRefetching}
          aria-label="Refetch all data"
        >
          {isRefetching ? 'Refetching...' : 'Refetch Data'}
        </button>
      </div>
      
      <div className="panels-container" role="tablist" aria-label="API Data Panels">
        <DataPanel 
          title="User Data" 
          status={apiData.user.status}
          data={apiData.user.data}
          error={apiData.user.error}
          panelId="userdata"
        />
        
        <DataPanel 
          title="Random Public API" 
          status={apiData.randomApi.status}
          data={apiData.randomApi.data}
          error={apiData.randomApi.error}
          panelId="randompublicapi"
        />
        
        <DataPanel 
          title="Failing Request" 
          status={apiData.failingApi.status}
          data={apiData.failingApi.data}
          error={apiData.failingApi.error}
          panelId="failingrequest"
        />
      </div>
    </div>
  );
};

export default DataDashboard;