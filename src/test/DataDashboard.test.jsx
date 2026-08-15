import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DataDashboard from '../components/DataDashboard';

// Mock data for testing
const mockUserData = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz'
};

const mockRandomApiData = {
  API: 'Random API',
  Description: 'A random API description',
  Link: 'https://example.com'
};

describe('DataDashboard', () => {
  beforeEach(() => {
    // Reset fetch mock
    vi.resetAllMocks();
    
    // Mock successful responses
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUserData)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRandomApiData)
      })
      .mockRejectedValueOnce(new Error('HTTP error! status: 404'));
  });

  it('renders loading states initially', () => {
    render(<DataDashboard />);
    
    expect(screen.getByTestId('panel-userdata-loading')).toBeInTheDocument();
    expect(screen.getByTestId('panel-randompublicapi-loading')).toBeInTheDocument();
    expect(screen.getByTestId('panel-failingrequest-loading')).toBeInTheDocument();
  });

  it('renders success and error states after loading', async () => {
    render(<DataDashboard />);
    
    await waitFor(() => {
      expect(screen.getByTestId('panel-userdata-success')).toBeInTheDocument();
    });
    
    expect(screen.getByTestId('panel-randompublicapi-success')).toBeInTheDocument();
    expect(screen.getByTestId('panel-failingrequest-error')).toBeInTheDocument();
  });

  it('renders user name in success state', async () => {
    render(<DataDashboard />);
    
    await waitFor(() => {
      const successPanel = screen.getByTestId('panel-userdata-success');
      expect(successPanel).toHaveTextContent('Leanne Graham');
    });
  });

  it('renders error message for failing request', async () => {
    render(<DataDashboard />);
    
    await waitFor(() => {
      const errorPanel = screen.getByTestId('panel-failingrequest-error');
      expect(errorPanel).toHaveTextContent('Error:');
      expect(errorPanel).toHaveTextContent('HTTP error! status: 404');
    });
  });
});