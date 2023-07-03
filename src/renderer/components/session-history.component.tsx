/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { ChartData } from './chart.component';
import { NodeUsed } from './node-used.component';
import { TempNavBar } from './temp-navbar.component';

export const SessionHistory = () => {
  const { t } = useTranslation();

  const boxStyle =
    'w-[95%] px-7 py-12 mt-7 h-fit  border-2  bg-[#0F131A] rounded-2xl border-[#171d28]';
  const boxText = 'text-[32px] font-bold text-white';

  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />

      <div className="m-10 w-fit text-white lg:m-0">
        <p className="w-fit text-[36px] font-semibold leading-[36px]">
          {t('session_history_label', { ns: 'general' })}
        </p>

        <div className="grid grid-cols-2 lg:min-w-full lg:grid-cols-4 ">
          <div className={boxStyle}>
            <div className="flex flex-row pb-8  ">
              <p className="basis-3/4 text-[20px] font-medium text-[#808080]">
                {t('active_session_label', { ns: 'general' })}
              </p>
              <p className="basis-1/4 text-[16px] font-medium text-[#70BF86]">+12.21%</p>
            </div>
            <div className={boxText}>10 H</div>
          </div>

          <div className={boxStyle}>
            <div className="flex flex-row pb-8">
              <p className="basis-3/4 text-[20px] font-medium text-[#808080]">
                {t('total_session_label', { ns: 'general' })}
              </p>
              <p className="basis-1/4 text-[16px] font-medium text-[#DA1C2C]">-2.21%</p>
            </div>
            <div className={boxText}>100 H</div>
          </div>

          <div className={boxStyle}>
            <div className="flex flex-row pb-8">
              <p className=" text-[20px] font-medium text-[#808080]">
                {t('highest_active_session_label', { ns: 'general' })}
              </p>
            </div>
            <div className={boxText}>10 H</div>
          </div>

          <div className={boxStyle}>
            <div className="flex flex-row pb-8">
              <p className="text-[20px] font-medium text-[#808080]">
                {t('longest_session_label', { ns: 'general' })}
              </p>
            </div>
            <div className={boxText}>12h : 31m : 2s</div>
          </div>
        </div>

        <ChartData
          heading={t('bandwidth_usage_label', { ns: 'general' })}
          type={2}
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
    </div>
  );
};
