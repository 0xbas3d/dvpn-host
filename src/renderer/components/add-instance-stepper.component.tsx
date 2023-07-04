import { useTranslation } from 'react-i18next';

export const AddInstanceStepper = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex w-[90%] items-center">
        {[1, 2, 3].map((step) => {
          return (
            <>
              <div className="grow border-t-[0.8px] border-[rgba(241,242,255,0.2)] first:hidden" />
              <div className="rounded-full bg-background-color bg-[url('../assets/images/mini-effect.png')] bg-center px-6 py-4 text-2xl font-medium text-text-color mix-blend-color-dodge">
                {step}
              </div>
            </>
          );
        })}
      </div>
      <div className="mt-8 flex w-full justify-between">
        <div className="text-2xl font-medium text-text-color">
          {t('setup_dependencies', { ns: 'setup' })}
        </div>
        <div className="text-2xl font-medium text-text-color">
          {t('node_configuration', { ns: 'setup' })}
        </div>
        <div className="text-2xl font-medium text-text-color">
          {t('key_creation_import', { ns: 'setup' })}
        </div>
      </div>
    </div>
  );
};
