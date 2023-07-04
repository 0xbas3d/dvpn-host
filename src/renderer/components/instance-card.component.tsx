import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container } from 'renderer/common/types';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { twJoin } from 'tailwind-merge';
import { StartNodeDialog } from './start-node-dialog.component';

export type InstanceCardProps = {
  instance: Container;
};

export const InstanceCard = ({ instance }: InstanceCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openPassword, setOpenPassword] = useState(false);

  const handleNavigateToInstance = () => {
    navigate(`${routeConst.instances}/${instance.name}`);
  };

  const stopContainer = async () => {
    if (instance.status !== 'Running') {
      setOpenPassword(true);
    } else {
      await window.electron.ipcRenderer.run([instance.name, 'stop']);
    }
  };

  return (
    <div className="flex  w-full flex-col rounded-[16px] border border-[#192a37]  bg-black text-white ">
      <div
        className={twJoin(
          'flex h-[87px] w-full flex-row items-center justify-center rounded-t-[16px] ',
          instance.status === 'Running' ? 'bg-[#295e3a]' : 'bg-[#b11a28]',
        )}>
        <p className="pr-32 text-[22px]  font-medium">{instance.name}</p>
        <p className="text-[22px] font-medium ">
          {instance.status === 'Running'
            ? t('active_label', { ns: 'general' })
            : t('inactive_label', { ns: 'general' })}
        </p>
      </div>
      <div className="flex  h-fit flex-row items-center justify-center py-14 text-[22px] font-medium  ">
        <button
          type="button"
          className="border-r border-[#192a37] px-8 "
          onClick={handleNavigateToInstance}>
          {t('view_label', { ns: 'general' })}
        </button>
        <button
          type="button"
          className="border-r border-[#192a37] px-8">
          {t('edit_label', { ns: 'general' })}
        </button>
        <button
          type="button"
          className="px-8"
          onClick={stopContainer}>
          {instance.status === 'Running'
            ? t('stop_label', { ns: 'general' })
            : t('start_label', { ns: 'general' })}
        </button>
      </div>
      <StartNodeDialog
        open={openPassword}
        setOpen={setOpenPassword}
        instanceName={instance.name}
      />
    </div>
  );
};
