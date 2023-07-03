import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routeConst } from 'renderer/common/types/consts/route-const.common';

export const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigateToInstance = () => {
    navigate(routeConst.instances);
  };

  const handleInstallDependencies = async () => {
    await window.electron.ipcRenderer.install();
  };

  return (
    <div className="min-h-[100vh]  w-full bg-[#090A13] bg-[url('./images/page-bg.png')] bg-cover bg-center  bg-no-repeat  p-0   bg-blend-difference">
      <div className="fixed  bottom-10 left-[140px] h-full w-full   bg-[url('./images/hero.png')] ">
        <div className="absolute top-20  w-full  pb-[300px] pt-16 ">
          <div>
            <img
              className="text-4xl font-extrabold text-white"
              alt={t('general:sentinel_label')}
              src="/assets/images/logo.png"
              height={86}
            />
          </div>
          <div className="absolute top-1/2">
            <div className="text-center  text-[80px] font-normal leading-none text-[#F1F2FF]">
              {t('general:title')}
            </div>
            <div className="mt-[72px] flex flex-col items-center justify-center gap-5 ">
              <button
                type="button"
                onClick={handleNavigateToInstance}
                className=" h-fit w-1/4 rounded-[63px] bg-[#1F5EFF] py-5 text-[24px] text-white">
                {t('start_label')}
              </button>
              <button
                type="button"
                onClick={handleInstallDependencies}
                className=" h-fit w-1/4 rounded-[63px] bg-[#1F5EFF] py-5 text-[24px] text-white">
                {t('install_label')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
