import { useTranslation } from 'react-i18next';

export const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="h-[1px] min-h-[100vh] w-full bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat px-48">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full flex-col justify-center">
          <div className="text-2xl font-medium text-text-color">
            {t('loading_label', { ns: 'general' })} ..
          </div>
          <div className="mt-4 h-4 w-full rounded-full bg-white">
            <div className="h-full w-[50%] rounded-full bg-[#2169ff]" />
          </div>
        </div>
      </div>
    </div>
  );
};
