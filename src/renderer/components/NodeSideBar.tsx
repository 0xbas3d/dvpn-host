import { useState } from 'react';
import { twJoin } from 'tailwind-merge';
import {
  ChevronRightIcon,
  ChatBubbleBottomCenterIcon,
  StopCircleIcon,
} from '@heroicons/react/24/solid';
import {
  ClockIcon,
  CircleStackIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import data from './general.json';

function StyledIcon({ IconComponent, selected }: any) {
  return (
    <IconComponent
      className={twJoin(
        'w-10 h-10 mr-6 p-2 rounded-full float-left text-[#808080] group-hover:text-text-color bg-[3b3c3e] group-hover:bg-[#1c65c7] transition',
        selected ? 'bg-[#1c65c7] text-text-color' : ''
      )}
    />
  );
}

const buttonList = [
  {
    name: data.node_overview_label,
    icon: (selected: any) => (
      <StyledIcon IconComponent={CpuChipIcon} selected={selected} />
    ),
  },
  {
    name: data.dvpn_earnings_label,
    icon: (selected: any) => (
      <StyledIcon IconComponent={CircleStackIcon} selected={selected} />
    ),
  },
  {
    name: data.session_history_label,
    icon: (selected: any) => (
      <StyledIcon IconComponent={ClockIcon} selected={selected} />
    ),
  },
  {
    name: data.subscription_history_label,
    icon: (selected: any) => (
      <StyledIcon
        IconComponent={ChatBubbleBottomCenterIcon}
        selected={selected}
      />
    ),
  },
  {
    name: data.bandwidth_usage_label,
    icon: (selected: any) => (
      <StyledIcon IconComponent={StopCircleIcon} selected={selected} />
    ),
  },
  {
    name: data.edit_node_configuration_label,
    icon: (selected: any) => (
      <StyledIcon IconComponent={CpuChipIcon} selected={selected} />
    ),
  },
];

function NodeSideBar() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(buttonList[0].name);
  return (
    <div className="text-text-color bg-[#0e1018] border-2 border-[#181a28] p-6 rounded-lg lg:w-4/12 w-6/12">
      <div className="text-xl">
        <div className="w-full flex py-2 border-b-2 border-[#181a28] px-4">
          <div className="w-4/12 text-[#808080]">
            {t(data.ip_address_label)}
          </div>
          <div className="w-1/12 text-[#808080]">:</div>
          <div className="w-7/12">136.251.15.107</div>
        </div>
        <div className="w-full flex py-4 border-b-2 border-[#181a28] px-4">
          <div className="w-4/12 text-[#808080]">{t(data.country_label)}</div>
          <div className="w-1/12 text-[#808080]">:</div>
          <div className="w-7/12">Canada</div>
        </div>
      </div>
      <div className="mt-8">
        {buttonList.map((button) => (
          <button
            type="button"
            className={twJoin(
              'transition w-full flex items-center text-xl p-5 border-2 rounded-3xl mb-4 text-left font-semibold hover:border-[#1c65c7] hover:text-text-color',
              selected === button.name
                ? 'border-[#1c65c7] text-text-color'
                : 'group border-[#181a28] text-[#808080] hover:cursor-pointer'
            )}
            onClick={() => {
              setSelected(button.name);
            }}
          >
            {button.icon(selected === button.name)}
            {button.name}
            <ChevronRightIcon className="w-6 h-6 ml-auto text-[#808080] group-hover:text-text-color" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default NodeSideBar;
