import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo.png';

export const NodeTopBar = () => {
  const { t } = useTranslation();
  return (
    <div className="flex">
      <span className="mr-auto">
        <img
          src={logo}
          alt="logo"
        />
      </span>
      <div className="flex space-x-14">
        <span className="text-right text-text-color">
          <span className="block pb-1 text-3xl font-bold">
            {t('node_monicker_label', { ns: 'general' })}
          </span>
          <span className="text-sm">sent8qu3r...410284</span>
        </span>
        <span className="z-50 flex h-2/3 cursor-pointer items-center rounded-md bg-[#007842] px-10 py-6 text-2xl font-semibold text-text-color">
          {t('start_node_label', { ns: 'general' })}
        </span>
      </div>
    </div>
  );
};
