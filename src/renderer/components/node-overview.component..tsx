/* eslint-disable import/no-extraneous-dependencies */
import { useTranslation } from 'react-i18next';
import { InstanceInfo } from './instance-info.component';
import { TempNavBar } from './temp-navbar.component';

export const InstancePage = () => {
  const { t } = useTranslation();

  const boxStyle = 'mr-3 px-6 py-12 mt-7   border-2  bg-[#0F131A] rounded-2xl border-[#171d28]';
  const boxText = 'text-[32px] font-bold text-white';

  const gridP1 = 'text-[20px] font-medium leading-5 text-[#808080]';
  const gridP2 = 'text-[24px] font-semibold leading-6 pt-6';

  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat  pt-32 lg:flex-row">
      <TempNavBar />

      <div className="m-10  w-fit text-white lg:m-0 lg:px-20">
        <p className="text-[36px] font-semibold leading-[36px]">Node Overview</p>

        <div className="mr-3 mt-7 rounded-2xl border-2  border-[#171d28]  bg-[#0F131A] px-6 py-10">
          <div className="grid grid-cols-3">
            <div className="flex flex-col items-start pl-10  ">
              <p className={gridP1}>{t('general:wallet_address_label')}</p>
              <p className={gridP2}>sent1jqd5s...axu6c</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className={gridP1}>{t('general:upload_speed_label')}</p>
              <p className={gridP2}>1000 Mbps</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className={gridP1}>{t('general:price_per_gb_label')}</p>
              <p className={gridP2}>$5.0</p>
            </div>
          </div>

          <div className="grid grid-cols-3 pt-16">
            <div className="flex flex-col items-start pl-10  ">
              <p className={gridP1}>{t('general:node_type_label')}</p>
              <p className={gridP2}>Lorem Ipsum</p>
            </div>
            <div className="flex flex-col items-start pl-20 ">
              <p className={gridP1}>{t('general:download_speed_label')}</p>
              <p className={gridP2}>1000 Mbps</p>
            </div>
          </div>
        </div>

        <InstanceInfo
          div1Heading={t('general:uptime_label')}
          div1SubHeading={+12.21}
          div1Text="99 %"
          div2Heading={t('general:unused_bandwidth_label')}
          div2SubHeading={-2.21}
          div2Text="35 GB"
          div3Heading={t('general:longest_session_label')}
          div3SubHeading={-2.21}
          div3Text="12h : 31m : 2s"
        />

        <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3   ">
          <div className={boxStyle}>
            <div className="flex flex-row pb-8  ">
              <p className="basis-11/12 text-[20px] font-medium text-[#808080]">
                {t('general:total_earnings_label')}
              </p>
              <p className="basis-1/12 text-[16px] font-medium text-[#70BF86]">+12.21%</p>
            </div>
            <div className={boxText}>
              4972 DVPN <span className="px-4 text-[20px] font-medium text-[#9EB4EC]">$2</span>
            </div>
          </div>

          <div className={boxStyle}>
            <div className="flex flex-row pb-8">
              <p className=" mr-[1.5px]  pr-1 text-[20px] font-medium text-[#808080] ">
                {t('general:active_subscription_label')} <span className="px-14 text-[#0F131A] " />
              </p>
              <p className=" pt-1 text-[16px] font-medium text-[#DA1C2C]">-2.21%</p>
            </div>
            <div className={boxText}>100k</div>
          </div>

          <div className={boxStyle}>
            <div className="flex flex-row pb-8">
              <p className="basis-10/12 text-[20px] font-medium text-[#808080]">
                {t('general:active_session_label')}
              </p>
              <p className="basis-1/12 text-[16px] font-medium text-[#DA1C2C]">-2.21%</p>
            </div>
            <div className={boxText}>2</div>
          </div>
        </div>
      </div>
    </div>
  );
};
