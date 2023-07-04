import { useTranslation } from 'react-i18next';
import { ChartData } from './chart.component';
import { InstanceInfo } from './instance-info.component';
import { InstanceGeneralLayout } from './instance-general-layout.component';

export const BandwidthUsage = () => {
  const { t } = useTranslation();
  return (
    <InstanceGeneralLayout>
      <div className="w-fit text-white">
        <p className="text-[36px] font-semibold leading-[36px]">{t('bandwidth_usage_label')}</p>
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
          type="large"
        />
      </div>
    </InstanceGeneralLayout>
  );
};
