import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { KeyConfigType, WalletInfoType } from 'renderer/common/types';
import { useTranslation } from 'react-i18next';
import { Loading } from './loading.component';
import { AddInstanceStepper } from './add-instance-stepper.component';
import { Setup } from './setup.component';
import { AddKey } from './add-key.component';
import { NodeConfig } from './node-config.component';

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

  const getDefaultConfig = async () => {
    const configResponse = (await window.electron.ipcRenderer.default()).split('\n');
    const defaultConfig: { [key: string]: string } = {};
    for (let i = 0; i < configResponse.length - 1; i += 1) {
      const split = configResponse[i].split('=');
      const [configKey, configValue] = split;
      defaultConfig[configKey] = configValue;
      if (i === configResponse.length - 2) setConfig(defaultConfig);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDefaultConfig();
    setLoading(false);
  }, []);

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
    return step === 1 ? navigate('/instances') : back();
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
      if (keyConfig.mnemonic.length > 0) navigate('/instances');
      else {
        setWalletInfo(JSON.parse(res));
        setOpen(true);
      }
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="h-[1px] min-h-[100vh] w-full bg-background-color">
      <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-no-repeat mix-blend-color-dodge blur-[300px]" />
      <div className="h-full w-full overflow-auto">
        <div className="flex h-full justify-center py-12">
          <div className="basis flex basis-[90%] flex-col justify-between gap-8">
            <AddInstanceStepper />
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
                  className="cursor-pointer rounded-full border border-[#1F5EFF] px-7 py-4 text-2xl font-medium text-text-color hover:bg-[#1F5EFF]"
                  onClick={addInstance}>
                  {step === 2 ? t('setup:next_label') : t('setup:submit_label')}
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
          navigate('/instances');
        }}>
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black opacity-50" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-[9999] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2226af] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="m-0 text-xl font-medium text-white">
              {t('setup:wallet_credentials')}
            </Dialog.Title>
            <Dialog.Description className="mb-5 mt-[10px] text-[15px] leading-normal text-white">
              *{t('setup:node_warning_one')} <br /> * {t('setup:node_warning_two')}
            </Dialog.Description>
            <div className="mt-4 flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('setup:mnemonic_label')}:
              </span>
              <div className="basis-[88%]">{walletInfo.mnemonic}</div>
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('setup:address_label')}:
              </span>
              <div className="basis-[88%]">{walletInfo.address}</div>
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-violet11 w-[90px] basis-[12%] text-right text-[15px]">
                {t('setup:operator_label')}:
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
