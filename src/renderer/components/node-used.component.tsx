import { useTranslation } from 'react-i18next';

export type NodeUsedProps = {
  type: 'V2Ray' | 'Wireguard' | 'OpenVPN';
};

export const NodeUsed = ({ type }: NodeUsedProps) => {
  const { t } = useTranslation();
  switch (type) {
    case 'V2Ray':
      return (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-[#7c99e2] p-2">
            {t('v2ray_label', { ns: 'general' })}
          </p>
        </td>
      );

    case 'Wireguard':
      return (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-[#1F5EFF] p-2">
            {t('wireguard_label', { ns: 'general' })}
          </p>
        </td>
      );

    case 'OpenVPN':
      return (
        <td className="hidden py-4 pl-10 pr-20 text-white lg:table-cell">
          <p className="flex justify-center bg-white p-2 text-[#91b0ff]">
            {t('openvpn_label', { ns: 'general' })}
          </p>
        </td>
      );

    default:
      return null;
  }
};
