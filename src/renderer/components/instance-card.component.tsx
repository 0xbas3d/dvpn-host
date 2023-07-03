import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Container } from 'renderer/common/types';
import { useTranslation } from 'react-i18next';
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
    <div className="min-w-[376px] cursor-pointer rounded-xl  bg-[url('../assets/images/instance-bg.png')] bg-cover pt-8 mix-blend-color-dodge">
      <div className="flex items-center pl-16">
        <div className="text-2xl font-medium text-text-color">{instance.name}</div>
        <div className="ml-2 rounded-full bg-[#F6F6F6] p-2">
          {instance.status === 'Running' ? (
            <div className="text-xs text-[#52A911]">{t('running_label', { ns: 'general' })}</div>
          ) : (
            <div className="text-xs text-[#861565]">{t('stopped_label', { ns: 'general' })}</div>
          )}
        </div>
      </div>
      <div className="mt-32">
        <div className="flex w-full border-t-[0.7px] border-[rgba(241,242,255,0.25)]">
          <button
            type="button"
            onClick={handleNavigateToInstance}
            className="flex basis-1/2 justify-center border-r border-[rgba(241,242,255,0.25)] px-14 py-6 text-2xl font-medium text-text-color">
            {t('details_label', { ns: 'general' })}
          </button>
          <button
            type="button"
            className="flex basis-1/2 justify-center px-14 py-6 text-2xl font-medium text-text-color"
            onClick={stopContainer}>
            {instance.status === 'Running'
              ? t('stop_label', { ns: 'general' })
              : t('start_label', { ns: 'general' })}
          </button>
        </div>
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
              {t('enter_password_label', { ns: 'general' })}
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
                  {t('start_label', { ns: 'general' })}
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
