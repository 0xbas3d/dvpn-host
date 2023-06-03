import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import AddInstanceStepper from './AddInstanceStepper';
import Setup from './Setup';
import Key from './Key';
import NodeConfig from './NodeConfig';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/solid';

export type KeyConfigType = {
  mnemonic: string | undefined;
  passphrase: string | undefined;
};

const AddInstance = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [config, setConfig] = useState<{ [key: string]: string }>();
  const [keyConfig, setKeyConfig] = useState<KeyConfigType>({
    mnemonic: undefined,
    passphrase: undefined,
  });
  const [containerName, setContainerName] = useState<string | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<{
    mnemonic: string;
    address: string;
    operator: string;
  }>({
    address: '',
    operator: '',
    mnemonic: '',
  });

  const getDefaultConfig = async () => {
    const config: any = (await window.electron.ipcRenderer.default()).split(
      '\n'
    );
    let default_config: { [key: string]: string } = {};
    for (let i = 0; i < config.length - 1; i++) {
      let split = config[i].split('=');
      default_config[split[0]] = split[1];
      if (i == config.length - 2) setConfig(default_config);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDefaultConfig();
    setLoading(false);
  }, []);

  const next = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const back = () => {
    setStep((prevStep) => prevStep - 1);
  };

  if (loading) return <Loading />;
  else
    return (
      <div className="bg-background-color w-full min-h-[100vh] h-[1px]">
        <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
        <div className="w-full overflow-auto h-full">
          <div className="flex py-12 justify-center h-full">
            <div className="basis-[90%] flex flex-col justify-between gap-8 basis">
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
                <NodeConfig config={config} setConfig={setConfig} />
              )}
              {step === 3 && (
                <Key keyConfig={keyConfig} setKeyConfig={setKeyConfig} />
              )}
              <div className="flex w-full justify-between z-50">
                <ArrowLeftIcon
                  className="text-text-color cursor-pointer"
                  width={36}
                  onClick={() => (step === 1 ? navigate('/instances') : back())}
                />
                {step > 1 && (
                  <div
                    className="cursor-pointer rounded-full text-text-color border border-[#1F5EFF] text-2xl font-medium py-4 px-7 hover:bg-[#1F5EFF]"
                    onClick={async () => {
                      if (step < 3 && containerName) {
                        setLoading(true);
                        const res = await window.electron.ipcRenderer.run([
                          containerName,
                          'init',
                          JSON.stringify({ ...config }),
                        ]);
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
                        if (keyConfig.mnemonic !== undefined)
                          navigate('/instances');
                        else {
                          setWalletInfo(JSON.parse(res));
                          setOpen(true);
                        }
                      }
                    }}
                  >
                    {step === 2 ? 'Next' : 'Submit'}
                  </div>
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
          }}
        >
          <Dialog.Portal>
            <Dialog.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0 opacity-50" />
            <Dialog.Content className="z-[9999] data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#2226af] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
              <Dialog.Title className="text-white m-0 text-xl font-medium">
                Wallet Credentials
              </Dialog.Title>
              <Dialog.Description className="text-white mt-[10px] mb-5 text-[15px] leading-normal">
                *Write this mnemonic in a safe place <br /> *Node can only run
                if there are tokens in the wallet
              </Dialog.Description>
              <div className="flex gap-2 text-white mt-4">
                <label
                  className="basis-[12%] text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="name"
                >
                  Mnemonic:
                </label>
                <div className="basis-[88%]">{walletInfo.mnemonic}</div>
              </div>
              <div className="flex gap-2 text-white">
                <label
                  className="basis-[12%] text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="username"
                >
                  Address:
                </label>
                <div className="basis-[88%]">{walletInfo.address}</div>
              </div>
              <div className="flex gap-2 text-white">
                <label
                  className="basis-[12%] text-violet11 w-[90px] text-right text-[15px]"
                  htmlFor="username"
                >
                  Operator:
                </label>
                <div className="basis-[88%]">{walletInfo.operator}</div>
              </div>
              <Dialog.Close asChild>
                <button className="mt-4 text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                  <XMarkIcon className="fill-white" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    );
};

export default AddInstance;
