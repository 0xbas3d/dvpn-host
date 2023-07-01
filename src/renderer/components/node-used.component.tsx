import React from 'react';
import { useTranslation } from 'react-i18next';

export type NodeUsedProps = {
  type: string;
};

export const NodeUsed = ({ type }: NodeUsedProps) => {
  let content: JSX.Element | null = null;
  const { t } = useTranslation();
  switch (type) {
    case 'V2Ray':
      content = (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-[#7c99e2] p-2">{t('general:v2ray_label')}</p>
        </td>
      );
      break;

    case 'Wireguard':
      content = (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-[#1F5EFF] p-2">{t('general:wireguard_label')}</p>
        </td>
      );
      break;

    case 'OpenVPN':
      content = (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-white p-2 text-[#91b0ff]">
            {t('general:openvpn_label')}
          </p>
        </td>
      );
      break;

    default:
      content = null;
      break;
  }

  return content;
};
