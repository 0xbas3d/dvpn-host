import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { twJoin } from 'tailwind-merge';
import { NodeStatus } from 'renderer/common/enums';
import { StartNodeDialog } from './start-node-dialog.component';
import logo from '../assets/images/logo.png';

export const NodeTopBar = () => {
  const { t } = useTranslation();
  const [openPassword, setOpenPassword] = useState(false);
  const [status, setStatus] = useState(NodeStatus.STOPPED);
  const params = useParams();

  const updateStatus = async (containerName: string) => {
    const res = await window.electron.ipcRenderer.custom([containerName, 'status']);
    setStatus(res);
  };

  const stopContainer = (containerName: string) => {
    window.electron.ipcRenderer.run([containerName, 'stop']);
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

  const handleNodeStatus = () => {
    if (status !== NodeStatus.RUNNING) setOpenPassword(true);
    else if (params?.name) stopContainer(params.name);
  };

  return (
    <div className="flex items-center justify-between px-[59px] py-[35px]">
      <img
        src={logo}
        alt="logo"
      />
      <div className="z-50 flex h-2/3 items-center rounded-md  bg-[#0F131A] px-10 py-6 text-2xl font-semibold text-text-color">
        Coming Soon
      </div>
      <div className="flex space-x-14">
        <span className="text-right text-text-color">
          <span className="block pb-1 text-3xl font-bold">
            {t('node_monicker_label', { ns: 'general' })}
          </span>
          <span className="text-sm">sent8qu3r...410284</span>
        </span>
        <button
          type="button"
          onClick={handleNodeStatus}
          className={twJoin(
            'z-50 flex h-2/3 cursor-pointer items-center rounded-md  px-10 py-6 text-2xl font-semibold text-text-color',
            status === NodeStatus.RUNNING ? 'bg-[#b11a28]' : 'bg-[#007842]',
          )}>
          {status !== NodeStatus.RUNNING
            ? t('start_node_label', { ns: 'general' })
            : t('stop_node_label', { ns: 'general' })}
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
