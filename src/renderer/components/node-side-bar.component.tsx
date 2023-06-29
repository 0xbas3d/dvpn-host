import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import {
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid';
import { ClockIcon, CircleStackIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

type IconProps = {
  IconComponent: any;
  isSelected: boolean;
};

const StyledIcon = ({ IconComponent, isSelected }: IconProps) => {
  return (
    <IconComponent
      className={twJoin(
        'float-left mr-6 h-10 w-10 rounded-full p-2 transition group-hover:bg-[#1c65c7] group-hover:text-text-color',
        isSelected ? 'bg-[#1c65c7] text-text-color' : 'bg-[#3b3c3e] text-[#808080]',
      )}
    />
  );
};

export const NodeSideBar = () => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(0);
  const buttonsInfoList = [
    {
      name: 'node_overview_label',
      icon: CpuChipIcon,
    },
    {
      name: 'dvpn_earnings_label',
      icon: CircleStackIcon,
    },
    {
      name: 'session_history_label',
      icon: ClockIcon,
    },
    {
      name: 'subscription_history_label',
      icon: ChatBubbleBottomCenterIcon,
    },
    {
      name: 'bandwidth_usage_label',
      icon: StopCircleIcon,
    },
    {
      name: 'edit_node_configuration_label',
      icon: CpuChipIcon,
    },
  ];

  const buttonsList = buttonsInfoList.map((buttonInfo, index) => {
    return {
      name: t(buttonInfo.name, { ns: 'general' }),
      icon: StyledIcon({ IconComponent: buttonInfo.icon, isSelected: selected === index }),
    };
  });

  return (
    <div className="block w-6/12 rounded-lg border-2 border-[#181a28] bg-[#0e1018] p-6 text-text-color lg:w-4/12">
      <span className="text-xl">
        <span className="flex w-full border-b-2 border-[#181a28] px-4 py-2">
          <span className="w-4/12 text-[#808080]">{t('ip_address_label', { ns: 'general' })}</span>
          <span className="w-1/12 text-[#808080]">:</span>
          <span className="w-7/12">136.251.15.107</span>
        </span>
        <span className="flex w-full border-b-2 border-[#181a28] px-4 py-4">
          <span className="w-4/12 text-[#808080]">{t('country_label', { ns: 'general' })}</span>
          <span className="w-1/12 text-[#808080]">:</span>
          <span className="w-7/12">Canada</span>
        </span>
      </span>
      <span className="mt-8">
        {buttonsList.map((button, index) => {
          return (
            <button
              key={button.name}
              type="button"
              className={twJoin(
                'mb-4 flex w-full items-center rounded-3xl border-2 p-5 text-left text-xl font-semibold transition hover:border-[#1c65c7] hover:text-text-color',
                selected === index
                  ? 'border-[#1c65c7] text-text-color'
                  : 'group border-[#181a28] text-[#808080] hover:cursor-pointer',
              )}
              onClick={() => {
                setSelected(index);
              }}>
              {button.icon}
              {button.name}
              <ChevronRightIcon className="ml-auto h-6 w-6 text-[#808080] group-hover:text-text-color" />
            </button>
          );
        })}
      </span>
    </div>
  );
};
