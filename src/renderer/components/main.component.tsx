import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routeConst } from 'renderer/common/consts/route-const.common';
import logo from '../assets/images/logo.png';

export const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToInstance = () => {
    navigate(routeConst.instances);
  };

  const handleInstallDependencies = () => {
    window.electron.ipcRenderer.install();
  };

  return (
    <div className="flex min-h-screen w-full items-stretch bg-[#090A13] bg-[url('./images/home-bg.jpg')] bg-cover  bg-center bg-no-repeat py-[60px] pl-[54px] bg-blend-difference">
      <div className="flex w-full flex-col justify-between">
        <div>
          <img
            className="text-4xl font-extrabold text-white"
            alt={t('sentinel_label', { ns: 'general' })}
            src={logo}
            height={86}
          />
        </div>
        <div>
          <div className="text-[100px] font-bold leading-none text-[#F1F2FF]">
            {t('dvpn_label', { ns: 'general' })}
          </div>
          <div className="text-[100px] font-normal leading-none text-[#F1F2FF]">
            {t('node_launcher', { ns: 'general' })}
          </div>
        </div>
        <div className="flex items-center gap-5 ">
          <button
            type="button"
            onClick={handleNavigateToInstance}
            className="rounded-[63px] bg-[#1F5EFF] px-[60px] py-6 text-[24px] text-white">
            {t('start_label', { ns: 'general' })}
          </button>
          <button
            type="button"
            onClick={handleInstallDependencies}
            className="rounded-[63px] border border-[#1F5EFF] px-[60px] py-6 text-[24px] text-white">
            {t('install_label', { ns: 'general' })}
          </button>
        </div>
      </div>
    </div>
  );
};
