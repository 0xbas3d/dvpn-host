import { useTranslation } from 'react-i18next';
import { InstanceInfo } from './instance-info.component';
import { ChartData } from './chart.component';
import { TempNavBar } from './temp-navbar.component';

export const DvpnEarning = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />

      <div className="m-10  w-fit text-white lg:m-0 lg:px-20">
        <p className="text-[36px] font-semibold leading-[36px]">
          {t('dvpn_earnings_label', { ns: 'general' })}
        </p>
        <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3">
          <InstanceInfo
            heading={t('total_earnings_label', { ns: 'general' })}
            percentage={+12.21}
            value="99%"
          />
          <InstanceInfo
            heading={t('average_usage_per_24_hrs_label', { ns: 'general' })}
            percentage={-2.21}
            value="35 GB"
          />
          <InstanceInfo
            heading={t('price_per_gb_label', { ns: 'general' })}
            percentage={-2.21}
            value="12h : 31m : 2s"
          />
        </div>
        <ChartData
          heading={t('bandwidth_usage_label', { ns: 'general' })}
          type="large"
        />
      </div>
    </div>
  );
};
