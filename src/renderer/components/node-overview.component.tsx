import { useTranslation } from 'react-i18next';
import { InstanceInfo } from './instance-info.component';
import { InstanceGeneralLayout } from './instance-general-layout.component';

export const InstancePage = () => {
  const { t } = useTranslation();

  return (
    <InstanceGeneralLayout>
      <div className="grow text-white">
        <p className="text-[36px] font-semibold leading-[36px]">
          {t('node_overview_label', { ns: 'general' })}
        </p>

        <div className="mr-3 mt-7 w-full rounded-2xl border-2  border-[#171d28]  bg-[#0F131A] px-6 py-10">
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-start pl-10  ">
              <p className="text-[20px] font-medium leading-5 text-[#808080]">
                {t('wallet_address_label', { ns: 'general' })}
              </p>
              <p className="pt-6 text-[24px] font-semibold leading-6">sent1jqd5s...axu6c</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className="text-[20px] font-medium leading-5 text-[#808080]">
                {t('upload_speed_label', { ns: 'general' })}
              </p>
              <p className="pt-6 text-[24px] font-semibold leading-6">1000 Mbps</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className="text-[20px] font-medium leading-5 text-[#808080]">
                {t('price_per_gb_label', { ns: 'general' })}
              </p>
              <p className="pt-6 text-[24px] font-semibold leading-6">$5.0</p>
            </div>
          </div>

          <div className="grid grid-cols-3 pt-16">
            <div className="flex flex-col items-start pl-10  ">
              <p className="text-[20px] font-medium leading-5 text-[#808080]">
                {t('node_used_label', { ns: 'general' })}
              </p>
              <p className="pt-6 text-[24px] font-semibold leading-6">Lorem Ipsum</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className="text-[20px] font-medium leading-5 text-[#808080]">
                {t('download_speed_label', { ns: 'general' })}
              </p>
              <p className="pt-6 text-[24px] font-semibold leading-6">1000 Mbps</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3">
          <InstanceInfo
            heading={t('uptime_label', { ns: 'general' })}
            percentage={+12.21}
            value="99 %"
          />
          <InstanceInfo
            heading={t('unused_bandwidth_label', { ns: 'general' })}
            percentage={-2.21}
            value="35 GB"
          />
          <InstanceInfo
            heading={t('longest_session_label', { ns: 'general' })}
            percentage={-2.21}
            value="12h : 31m : 2s"
          />
        </div>

        <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3   ">
          <InstanceInfo
            heading={t('total_earnings_label', { ns: 'general' })}
            percentage={12.21}
            value="4972 DVPN "
          />
          <InstanceInfo
            heading={t('active_subscriptions_label', { ns: 'general' })}
            percentage={-2.21}
            value="100k"
          />
          <InstanceInfo
            heading={t('active_sessions_label', { ns: 'general' })}
            percentage={-2.21}
            value="2"
          />
        </div>
      </div>
    </InstanceGeneralLayout>
  );
};
