import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Container } from 'renderer/common/types';
import { useTranslation } from 'react-i18next';
import { twJoin } from 'tailwind-merge';
import { routeConst } from 'renderer/common/types/consts/route-const.common';

export type InstanceCardProps = {
  instance: Container;
};

export const InstanceCard = ({ instance }: InstanceCardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [openPassword, setOpenPassword] = useState(false);
  const [password, setPassword] = useState('');

  const startContainer = async () => {
    await window.electron.ipcRenderer.run([instance.name, 'start', password]);
  };

  const handleNavigateToInstance = () => {
    navigate(routeConst.instance(instance.name));
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
          {instance.status === 'Running' ? t('general:active_label') : t('general:inactive_label')}
        </p>
      </div>
      <div className="flex  h-fit flex-row items-center justify-center py-14 text-[22px] font-medium  ">
        <button
          type="button"
          className="border-r border-[#192a37] px-8 "
          onClick={handleNavigateToInstance}>
          {t('general:view_label')}
        </button>
        <button
          type="button"
          className="border-r border-[#192a37] px-8">
          {t('general:edit_label')}
        </button>
        <button
          type="button"
          className="px-8"
          onClick={stopContainer}>
          {instance.status === 'Running' ? t('general:stop_label') : t('general:start_label')}
        </button>
      </div>
      <Dialog.Root
        open={openPassword}
        onOpenChange={() => {
          setOpenPassword(false);
          setPassword('');
        }}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2226af] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0 text-xl font-medium text-white">
              {t('general:enter_password_label')}
            </Dialog.Title>
            <div className="mt-4 w-full rounded-lg bg-[#1E2148] px-5 py-3">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  return setPassword(e.target.value);
                }}
                className="w-full bg-transparent text-lg text-text-color focus:outline-none"
              />
            </div>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="bg-green4 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] text-lg font-medium leading-none text-white focus:shadow-[0_0_0_2px] focus:outline-none"
                  onClick={startContainer}>
                  {t('general:start_label')}
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] mt-4 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                <XMarkIcon className="fill-white" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
