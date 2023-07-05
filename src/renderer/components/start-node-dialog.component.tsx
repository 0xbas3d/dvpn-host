import * as Dialog from '@radix-ui/react-dialog';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/solid';

type StartNodeDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  instanceName: string;
};

export const StartNodeDialog = ({ open, setOpen, instanceName }: StartNodeDialogProps) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');

  const startContainer = () => {
    window.electron.ipcRenderer.run([instanceName, 'start', password]);
  };

  const handleDialogOpenChange = () => {
    setOpen(false);
    setPassword('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleDialogOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black opacity-50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#090A13] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="m-0 text-xl font-medium text-white">
            {t('enter_password_label', { ns: 'general' })}
          </Dialog.Title>
          <div className="mt-4 w-full rounded-lg bg-[#1E2148] px-5 py-3">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
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
  );
};
