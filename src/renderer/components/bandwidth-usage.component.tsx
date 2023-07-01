/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { InstanceInfo } from './instance-info.component';
import { ChartData } from './chart.component';
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
        <InstanceInfo
          div1Heading={t('general:total_bandwidth_consumed_label')}
          div1SubHeading={+12.21}
          div1Text="10 Mbps"
          div2Heading={t('general:unused_bandwidth_label')}
          div2SubHeading={0}
          div2Text="100 GB"
          div3Heading={t('general:average_usage_per_day_label')}
          div3SubHeading={-2.21}
          div3Text="12h : 31m : 2s"
        />
        <ChartData
          heading={t('general:bandwidth_usage_label')}
          type={1}
        />
      </div>
    </div>
  );
};
