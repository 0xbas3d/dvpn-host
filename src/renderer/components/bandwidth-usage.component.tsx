import { useTranslation } from 'react-i18next';
import { ChartData } from './chart.component';
import { InstanceInfo } from './instance-info.component';
import { TempNavBar } from './temp-navbar.component';

export const BandwidthUsage = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />

      <div className="m-10  w-fit text-white lg:m-0 lg:px-20">
        <p className="text-[36px] font-semibold leading-[36px]">
          {t('subscription_history_label')}
        </p>
        <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3">
          <InstanceInfo
            heading={t('total_bandwidth_consumed_label', { ns: 'general' })}
            percentage={+12.21}
            value="10 Mbps"
          />
          <InstanceInfo
            heading={t('unused_bandwidth_label', { ns: 'general' })}
            percentage={0}
            value="100 GB"
          />
          <InstanceInfo
            heading={t('average_usage_per_24_hrs_label', { ns: 'general' })}
            percentage={-2.21}
            value="12h : 31m : 2s"
          />
        </div>
        <ChartData
          heading={t('bandwidth_usage_label', { ns: 'general' })}
          type="1"
        />
      </div>
    </div>
  );
};
