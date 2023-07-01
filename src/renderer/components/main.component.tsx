import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeButton } from './home-button.component';
import logo from '../assets/images/logo.png';
import earth from '../assets/images/bg-earth.png';

export const Main = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleNavigateToInstance = () => {
    navigate(routeConst.instances);
  };
  return (
    <div className="min-h-[100vh] w-full bg-background-color px-48 pt-32">
      <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-center bg-no-repeat mix-blend-color-dodge blur-[300px]" />
      <div className="absolute bottom-0 right-0">
        <img
          alt=""
          src={earth}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <img
            alt={t('general:sentinel_label')}
            src={logo}
            height={82}
          />
        </div>
        <button
          type="button"
          onClick={handleNavigateToInstance}
          className="z-50 flex cursor-pointer items-center gap-2 rounded-full border border-border-color px-8 py-4 text-text-color hover:bg-[#1F5EFF]">
          <div className="text-4xl font-medium">{t('general:go_to_instances_label')}</div>
          <div>
            <ArrowRightIcon
              height={36}
              width={48}
            />
          </div>
        </button>
      </div>
      <div className="pt-[300px]">
        <div className="inline-grid grid-cols-2 gap-20">
          <HomeButton>{t('general:sentinel_website')}</HomeButton>
          <HomeButton>{t('general:docs_link')}</HomeButton>
          <HomeButton>{t('general:social_link')}</HomeButton>
          <HomeButton>{t('general:github_repo_link')}</HomeButton>
        </div>
      </div>
    </div>
  );
};
