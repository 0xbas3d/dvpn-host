import { useNavigate } from 'react-router-dom';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { useTranslation } from 'react-i18next';

export const TempNavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateToNodeOverview = () => {
    navigate(routeConst.instance('name'));
  };

  const handleNavigateToSubscriptionHistory = () => {
    navigate(routeConst.subscriptionHistory('name'));
  };

  const handleNavigateToDvpnEarnings = () => {
    navigate(routeConst.earing('name'));
  };
  const handleNavigateToSessionHistory = () => {
    navigate(routeConst.sessionHistory('name'));
  };

  const handleNavigateToBandwidthUsage = () => {
    navigate(routeConst.bandwidthUsage('name'));
  };

  return (
    <div className="basis-1/4">
      <button
        type="button"
        onClick={handleNavigateToNodeOverview}
        className="bg-white">
        {t('node_overview_label', { ns: 'general' })}
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToDvpnEarnings}
        className="bg-white">
        {t('dvpn_earnings_label', { ns: 'general' })}
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToSessionHistory}
        className="bg-white">
        {t('session_history_label', { ns: 'general' })}
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToSubscriptionHistory}
        className="bg-white">
        {t('subscription_history_label', { ns: 'general' })}
      </button>
      <br />
      <button
        type="button"
        onClick={handleNavigateToBandwidthUsage}
        className="bg-white">
        {t('bandwidth_usage_label', { ns: 'general' })}
      </button>
    </div>
  );
};
