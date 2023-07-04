import { useTranslation } from 'react-i18next';
import { ChartData } from './chart.component';
import { InstanceInfo } from './instance-info.component';
import { NodeSideBar } from './node-side-bar.component';
import { NodeUsed } from './node-used.component';
import { InstanceGeneralLayout } from './instance-general-layout.component';

export const SessionHistory = () => {
  const { t } = useTranslation();

  return (
    <InstanceGeneralLayout>
      <div className="m-10 w-fit text-white lg:m-0">
        <p className="w-fit text-[36px] font-semibold leading-[36px]">
          {t('session_history_label', { ns: 'general' })}
        </p>

        <div className="grid grid-cols-2 pr-10 lg:min-w-full lg:grid-cols-4 ">
          <InstanceInfo
            heading={t('active_sessions_label', { ns: 'general' })}
            percentage={+12.21}
            value="10 H"
          />
          <InstanceInfo
            heading={t('total_sessions_label', { ns: 'general' })}
            percentage={-2.21}
            value="100 H"
          />
          <InstanceInfo
            heading={t('highest_active_sessions_label', { ns: 'general' })}
            percentage={+12.21}
            value="10 H"
          />
          <InstanceInfo
            heading={t('longest_session_label', { ns: 'general' })}
            percentage={+12.21}
            value="12h : 31m : 2s"
          />
        </div>

        <ChartData
          heading={t('bandwidth_usage_label', { ns: 'general' })}
          type="small"
        />

        <div className="mt-7 w-fit rounded-2xl border-2 border-[#171d28] bg-[#0F131A] ">
          <p className="p-8 text-[28px] font-semibold ">
            {t('session_history_label', { ns: 'general' })}
          </p>
          <div className="flex flex-row bg-[#161A25]">
            <table>
              <thead>
                <tr className="min-w-fit text-[16px] text-[#CBCBCB]">
                  <td className="py-4 pl-10 pr-20">
                    {t('session_start_time_label', { ns: 'general' })}
                  </td>
                  <td className="py-4 pl-10 pr-20">{t('date_label', { ns: 'general' })}</td>
                  <td className="py-4 pl-10 pr-20">{t('duration_label', { ns: 'general' })}</td>
                  <td className="hidden py-4 pl-10 pr-20 lg:table-cell">
                    {t('node_used_label', { ns: 'general' })}
                  </td>
                  <td className="py-4 pl-10 pr-20">
                    {t('data_consumed_label', { ns: 'general' })}
                  </td>
                  <td className="hidden py-4 pl-4 lg:table-cell ">
                    {t('location_of_node_label', { ns: 'general' })}
                  </td>
                </tr>
              </thead>

              <tbody className="border-b border-b-[#161A25] bg-[#0F131A] font-normal text-[#8B8B8B]">
                <tr>
                  <td className="py-4 pl-10 pr-20">11:43:23</td>
                  <td className="py-4 pl-10 pr-20">27-07-2023</td>
                  <td className="py-4 pl-10 pr-20">0.234 sec</td>
                  <NodeUsed type="Wireguard" />
                  <td className="py-4 pl-10 pr-20">0.15 MB</td>
                  <td className="hidden py-6 pl-7 pr-[85px] lg:table-cell">Singapore</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </InstanceGeneralLayout>
  );
};
