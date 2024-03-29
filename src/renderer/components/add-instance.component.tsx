import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { KeyConfigType, WalletInfoType } from 'renderer/common/types';
import { routeConst } from 'renderer/common/consts/route-const.common';
import { twJoin } from 'tailwind-merge';
import { AddKey } from './add-key.component';
import { Loading } from './loading.component';
import { NodeConfig } from './node-config.component';
import { Setup } from './setup.component';

export const AddInstance = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<Record<string, string>>({});
  const [keyConfig, setKeyConfig] = useState<KeyConfigType>({
    mnemonic: '',
    passphrase: '',
  });
  const [containerName, setContainerName] = useState('');
  const [open, setOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfoType>({
    address: '',
    operator: '',
    mnemonic: '',
  });
  const { t } = useTranslation();

  const next = () => {
    setStep((prevStep) => {
      return prevStep + 1;
    });
  };
  const back = () => {
    setStep((prevStep) => {
      return prevStep - 1;
    });
  };

  const goBack = () => {
    if (step === 1) navigate(routeConst.instances);
    else back();
  };

  const addInstance = async () => {
    if (step < 3 && containerName) {
      setLoading(true);
      await window.electron.ipcRenderer.run([containerName, 'init', JSON.stringify({ ...config })]);
      setLoading(false);
      next();
    } else if (containerName) {
      setLoading(true);
      const res = await window.electron.ipcRenderer.run([
        containerName,
        'init_keys',
        JSON.stringify({ ...keyConfig }),
      ]);
      setLoading(false);
      if (keyConfig.mnemonic.length > 0) navigate(routeConst.instances);
      else {
        setWalletInfo(JSON.parse(res));
        setOpen(true);
      }
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="h-[1px] min-h-screen w-full bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat">
      <div className="h-full w-full overflow-auto">
        <div className="flex h-full justify-center py-12">
          <div className="basis flex basis-[90%] flex-col justify-between gap-8">
            {step === 1 && (
              <Setup
                next={next}
                setLoading={setLoading}
                containerName={containerName}
                setContainerName={setContainerName}
              />
            )}
            {step === 2 && config && (
              <NodeConfig
                config={config}
                setConfig={setConfig}
              />
            )}
            {step === 3 && (
              <AddKey
                keyConfig={keyConfig}
                setKeyConfig={setKeyConfig}
              />
            )}
            <div className="z-50 flex w-full justify-between">
              <ArrowLeftIcon
                className="cursor-pointer text-text-color"
                width={36}
                onClick={goBack}
              />
              {step > 1 && (
                <button
                  type="button"
                  disabled={step === 3 && keyConfig.passphrase.length < 8}
                  className={twJoin(
                    'rounded-full border border-[#1F5EFF] px-7 py-4 text-2xl font-medium text-text-color',
                    step === 3 && keyConfig.passphrase.length >= 8 ? 'hover:bg-[#1F5EFF]' : '',
                  )}
                  onClick={addInstance}>
                  {step === 2
                    ? t('next_label', { ns: 'setup' })
                    : t('submit_label', { ns: 'setup' })}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog.Root
        open={open}
        onOpenChange={() => {
          setWalletInfo({
            address: '',
            operator: '',
            mnemonic: '',
          });
          setOpen(false);
          navigate(routeConst.instances);
        }}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[9999] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#090A13] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0 text-xl font-medium text-white">
              {t('wallet_credentials', { ns: 'setup' })}
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-white">
              *{t('node_warning_one', { ns: 'setup' })} <br /> *{' '}
              {t('node_warning_two', { ns: 'setup' })}
            </Dialog.Description>
            <div className="mt-4 flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('mnemonic_label', { ns: 'setup' })}:
              </span>
              <div className="basis-[88%]">{walletInfo.mnemonic}</div>
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('address_label', { ns: 'setup' })}:
              </span>
              <div className="basis-[88%]">{walletInfo.address}</div>
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('operator_label', { ns: 'setup' })}:
              </span>
              <div className="basis-[88%]">{walletInfo.operator}</div>
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
