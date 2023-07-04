import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import { StartNodeDialog } from './start-node-dialog.component';
import logo from '../assets/images/logo.png';

export const NodeTopBar = () => {
  const { t } = useTranslation();
  const [openPassword, setOpenPassword] = useState(false);
  const [status, setStatus] = useState('Stopped');
  const params = useParams();

  const updateStatus = async (containerName: string) => {
    const res = await window.electron.ipcRenderer.custom([containerName, 'status']);
    setStatus(res);
  };

  const stopContainer = async (containerName: string) => {
    await window.electron.ipcRenderer.run([containerName, 'stop']);
  };

  useEffect(() => {
    const instanceName = params.name;
    if (instanceName) {
      const interval = setInterval(() => {
        return updateStatus(instanceName);
      }, 1000);
      return () => {
        return clearInterval(interval);
      };
    }
  }, [params]);

  return (
    <div className="flex px-[59px] py-[35px]">
      <img
        src={logo}
        alt="logo"
        className="mr-auto"
      />
      <div className="flex space-x-14">
        <span className="text-right text-text-color">
          <span className="block pb-1 text-3xl font-bold">
            {t('node_monicker_label', { ns: 'general' })}
          </span>
          <span className="text-sm">sent8qu3r...410284</span>
        </span>
        <button
          type="button"
          onClick={() => {
            if (status !== 'Running') setOpenPassword(true);
            else if (params && params.name) stopContainer(params.name);
          }}
          className={twJoin(
            'z-50 flex h-2/3 cursor-pointer items-center rounded-md  px-10 py-6 text-2xl font-semibold text-text-color',
            status === 'Running' ? 'bg-[#b11a28]' : 'bg-[#007842]',
          )}>
          {status !== 'Running' ? t('start_node_label', { ns: 'general' }) : t('stop_node_label')}
        </button>
      </div>
      <StartNodeDialog
        open={openPassword}
        setOpen={setOpenPassword}
        instanceName={params.name ? params.name : ''}
      />
    </div>
  );
};
