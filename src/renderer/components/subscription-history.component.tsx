/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { InstanceInfo } from './instance-info.component';
import { ChartData } from './chart.component';
import { TempNavBar } from './temp-navbar.component';
import { NodeUsed } from './node-used.component';

export const SubscriptionHistory = () => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />
      <div className="m-10 w-fit text-white lg:m-0 lg:px-20">
        <p className="text-[36px] font-semibold leading-[36px]">
          {t('general:subscription_history_label')}
        </p>
        <InstanceInfo
          div1Heading={t('general:active_subscription_label')}
          div1SubHeading={+12.21}
          div1Text="10 H"
          div2Heading={t('general:total_subscription_label')}
          div2SubHeading={-2.21}
          div2Text="100 h"
          div3Heading={t('general:highest_cost_subscription_label')}
          div3SubHeading={-2.21}
          div3Text="12h : 31m : 2s"
        />

        <ChartData
          heading={t('general:bandwidth_usage_label')}
          type={2}
        />

        <div className="mt-7 w-fit rounded-2xl border-2 border-[#171d28] bg-[#0F131A] ">
          <p className="p-8 text-[28px] font-semibold ">
            {t('general:subscription_history_label')}
          </p>
          <div className="flex flex-row bg-[#161A25]">
            <table>
              <thead>
                <tr className="min-w-fit text-[16px] text-[#CBCBCB]">
                  <td className="px-12 py-4">{t('general:date_and_time_label')}</td>
                  <td className="px-12 py-4">{t('general:cost_label')}</td>
                  <td className="px-12 py-4">{t('general:data_consumed_label')}</td>
                  <td className="px-12 py-4">{t('general:data_left_label')}</td>
                  <td className="hidden px-12 py-4 lg:table-cell">
                    {t('general:node_used_label')}
                  </td>
                  <td className="hidden py-4 pl-4 lg:table-cell ">
                    {t('general:location_of_node_label')}
                  </td>
                </tr>
              </thead>

              <tbody className="border-b border-b-[#161A25] bg-[#0F131A] font-normal text-[#8B8B8B]">
                <tr>
                  <td className="px-12 py-4">07-12-2022 11:43:23</td>
                  <td className="px-12 py-4">$ 1.23</td>
                  <td className="px-12 py-4">0.15 MB</td>
                  <td className="px-12 py-4">1.234 TB</td>
                  <NodeUsed type="Wireguard" />
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
