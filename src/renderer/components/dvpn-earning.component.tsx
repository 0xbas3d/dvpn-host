/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { ChartData } from './chart.component';
import { InstanceInfo } from './instance-info.component';
import { TempNavBar } from './temp-navbar.component';

export const DvpnEarning = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />

      <div className="m-10  w-fit text-white lg:m-0 lg:px-20">
        <p className="text-[36px] font-semibold leading-[36px]">{t('dvpn_earnings_label')}</p>

        <InstanceInfo
          div1Heading={t('total_earnings_label', { ns: 'general' })}
          div1SubHeading={+12.21}
          div1Text="99%"
          div2Heading={t('average_usage_per_day_label', { ns: 'general' })}
          div2SubHeading={-2.21}
          div2Text="35 GB"
          div3Heading={t('price_per_gb_label', { ns: 'general' })}
          div3SubHeading={-2.21}
          div3Text="12h : 31m : 2s"
        />

        <ChartData
          heading={t('bandwidth_usage_label', { ns: 'general' })}
          type={1}
        />
      </div>
    </div>
  );
};
