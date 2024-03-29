import { Dispatch, DispatchWithoutAction, SetStateAction, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { twJoin } from 'tailwind-merge';

export type SetupProps = {
  containerName: string;
  setContainerName: Dispatch<SetStateAction<string>>;
  next: DispatchWithoutAction;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const Setup = ({ containerName, setContainerName, next, setLoading }: SetupProps) => {
  const { t } = useTranslation();
  const setupContainer = () => {
    if (containerName === '') {
      // eslint-disable-next-line no-alert
      alert('Container name cannot be empty');
    } else {
      setLoading(true);
      window.electron.ipcRenderer.run([containerName, 'setup']).then(() => {
        setLoading(false);
        next();
      });
    }
  };

  const handleContainerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContainerName(e.target.value);
  };

  return (
    <div className="z-50 flex h-full flex-col items-center justify-center gap-8">
      <div>
        <div className="text-2xl font-medium text-text-color">
          {t('container_name', { ns: 'setup' })}
        </div>
        <div className="mt-2 w-full rounded-lg bg-[#1E2148] px-5 py-3">
          <input
            type="text"
            value={containerName}
            onChange={handleContainerNameChange}
            className="w-full bg-transparent text-lg text-text-color focus:outline-none"
          />
        </div>
        <div className="mt-6 text-white">* Container Name should not contain spaces</div>
      </div>
      <button
        type="button"
        disabled={containerName.includes(' ')}
        onClick={setupContainer}
        className={twJoin(
          'z-50 inline-block rounded-full border border-[#1F5EFF] p-6 text-2xl font-medium text-text-color',
          !containerName.includes(' ') ? 'hover:bg-[#1F5EFF]' : '',
        )}>
        {t('setup_install', { ns: 'setup' })}
      </button>
    </div>
  );
};
