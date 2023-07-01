import React from 'react';
import { useNavigate } from 'react-router-dom';

export const TempNavBar = () => {
  const navigate = useNavigate();
  const handleNavigateToNodeOverview = () => {
    navigate('/instance/:name');
  };

  const handleNavigateToSubscriptionHistory = () => {
    navigate('/subscriptionHistory/:name');
  };

  const handleNavigateToDvpnEarnings = () => {
    navigate('/dvpnEarnings/:name');
  };
  const handleNavigateToSessionHistory = () => {
    navigate('/sessionHistory/:name');
  };

  const handleNavigateToBandwidthUsage = () => {
    navigate('/bandwidthUsage/:name');
  };

  return (
    <div className="basis-1/4">
      <button
        type="button"
        onClick={handleNavigateToNodeOverview}
        className="bg-white">
        Node Overview
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToDvpnEarnings}
        className="bg-white">
        Dvpn Earnings
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToSessionHistory}
        className="bg-white">
        Session History
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToSubscriptionHistory}
        className="bg-white">
        Subscription History
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToBandwidthUsage}
        className="bg-white">
        Bandwidth Usage
      </button>
    </div>
  );
};
