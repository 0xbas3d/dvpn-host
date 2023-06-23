import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Container } from './Instances';
import { useTranslation } from 'react-i18next';
import data from './general.json';

function InstanceCard({ instance }: { instance: Container }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openPassword, setOpenPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  return (
    <div className="bg-black  min-w-[401px] text-white flex flex-col border-[#192a37]  border rounded-[16px] ">
      <div
        className={`h-[87px] flex flex-row items-center justify-center ${
          instance.status === 'Running' ? 'bg-[#295e3a]' : 'bg-[#b11a28]'
        } w-full rounded-t-[16px]`}
      >
        <p className="text-[22px] font-medium  pr-32">{instance.name}</p>
        <p className="text-[22px] font-medium ">
          {instance.status === 'Running'
            ? t(data.active_label)
            : t(data.inactive_label)}
        </p>
      </div>
      <div className="text-[22px]  font-medium flex h-[142px] flex-row justify-center items-center  ">
        <button
          type="button"
          className="px-8 border-r border-[#192a37] cursor-pointer "
          onClick={() => navigate(`/instance/${instance.name}`)}
        >
          {t(data.view_label)}
        </button>
        <button type="button" className="px-8 border-r border-[#192a37]">
          {t(data.edit_label)}
        </button>
        <button
          type="button"
          className="px-8"
          onClick={async () => {
            if (instance.status !== 'Running') {
              setOpenPassword(true);
            } else {
              const res = await window.electron.ipcRenderer.run([
                instance.name,
                'stop',
              ]);
            }
          }}
        >
          {instance.status === 'Running'
            ? t(data.stop_label)
            : t(data.start_label)}
        </button>
      </div>
      <Dialog.Root
        open={openPassword}
        onOpenChange={() => {
          setOpenPassword(false);
          setPassword('');
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0 opacity-50" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2226af] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-white m-0 text-xl font-medium">
              Enter Password
            </Dialog.Title>
            <div className="w-full bg-[#1E2148] rounded-lg px-5 py-3 mt-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-text-color text-lg w-full focus:outline-none"
              />
            </div>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="text-lg bg-green4 text-white hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                  onClick={async () => {
                    const res = await window.electron.ipcRenderer.run([
                      instance.name,
                      'start',
                      password,
                    ]);
                  }}
                >
                  Start
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="mt-4 text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                <XMarkIcon className="fill-white" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default InstanceCard;
