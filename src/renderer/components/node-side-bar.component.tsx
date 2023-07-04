import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { twJoin } from 'tailwind-merge';
import {
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  StopCircleIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { ClockIcon, CircleStackIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export type StyledIconProps = {
  icon: any;
  selected: boolean;
};

export type InfoButton = {
  name: string;
  icon: any;
  link: string;
};

const StyledIcon = ({ icon: Icon, selected }: StyledIconProps) => {
  return (
    <Icon
      className={twJoin(
        'float-left mr-6 h-10 w-10 rounded-full p-2 transition group-hover:bg-[#1c65c7] group-hover:text-text-color',
        selected ? 'bg-[#1c65c7] text-text-color' : 'bg-[#3b3c3e] text-[#808080]',
      )}
    />
  );
};

export const NodeSideBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const infoButtons: InfoButton[] = [
    {
      name: t('node_overview_label', { ns: 'general' }),
      icon: CpuChipIcon,
      link: `${routeConst.instances}/${params.name}`,
    },
    {
      name: t('dvpn_earnings_label', { ns: 'general' }),
      icon: CircleStackIcon,
      link: `${routeConst.earning}/${params.name}`,
    },
    {
      name: t('session_history_label', { ns: 'general' }),
      icon: ClockIcon,
      link: `${routeConst.sessionHistory}/${params.name}`,
    },
    {
      name: t('subscription_history_label', { ns: 'general' }),
      icon: ChatBubbleBottomCenterIcon,
      link: `${routeConst.subscriptionHistory}/${params.name}`,
    },
    {
      name: t('bandwidth_usage_label', { ns: 'general' }),
      icon: StopCircleIcon,
      link: `${routeConst.bandwidthUsage}/${params.name}`,
    },
    {
      name: t('edit_node_configuration_label', { ns: 'general' }),
      icon: CpuChipIcon,
      link: `${routeConst.editNodeConfig}/${params.name}`,
    },
  ];

  return (
    <div className="lg:sticky lg:top-[20px] lg:h-[300px] lg:overscroll-contain">
      <div className="mb-[20px] flex items-center gap-[31px]">
        <ArrowLeftIcon
          width={42}
          height={32}
          className="cursor-pointer fill-white"
          onClick={() => {
            return navigate(routeConst.instances);
          }}
        />
        <span className="text-[32px] font-semibold text-white">{params.name}</span>
      </div>
      <div className="rounded-lg border-2 border-[#181a28] bg-[#0e1018] p-6 text-text-color">
        <span className="text-xl">
          <span className="flex w-full border-b-2 border-[#181a28] px-4 py-2">
            <span className="w-4/12 text-[#808080]">
              {t('ip_address_label', { ns: 'general' })}
            </span>
            <span className="w-1/12 text-[#808080]">:</span>
            <span className="w-7/12">136.251.15.107</span>
          </span>
          <span className="flex w-full border-b-2 border-[#181a28] px-4 py-4">
            <span className="w-4/12 text-[#808080]">{t('country_label', { ns: 'general' })}</span>
            <span className="w-1/12 text-[#808080]">:</span>
            <span className="w-7/12">Canada </span>
          </span>
        </span>
        <span className="mt-8">
          {infoButtons.map((button) => {
            return (
              <button
                key={button.name}
                type="button"
                className={twJoin(
                  'mb-4 flex w-full items-center rounded-3xl border-2 p-5 text-left text-xl font-semibold transition hover:border-[#1c65c7] hover:text-text-color',
                  location.pathname === button.link
                    ? 'border-[#1c65c7] text-text-color'
                    : 'group border-[#181a28] text-[#808080] hover:cursor-pointer',
                )}
                onClick={() => {
                  return navigate(button.link);
                }}>
                <StyledIcon
                  icon={button.icon}
                  selected={location.pathname === button.link}
                />
                {button.name}
                <ChevronRightIcon className="ml-auto h-6 w-6 text-[#808080] group-hover:text-text-color" />
              </button>
            );
          })}
        </span>
      </div>
    </div>
  );
};
