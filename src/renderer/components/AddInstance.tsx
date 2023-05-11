import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from './Loading';
import AddInstanceStepper from './AddInstanceStepper';
import Setup from './Setup';
import Key from './Key';
import NodeConfig from './NodeConfig';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

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
      <div className="flex flex-col  bg-background-color w-full h-full">
        <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
        <div className="basis-[88%] overflow-auto">
          <div className="flex py-20 justify-center h-full">
            <div className="basis-[90%] flex flex-col justify-between gap-8">
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
                        console.log(res);
                        next();
                      } else if (containerName) {
                        setLoading(true);
                        const res = await window.electron.ipcRenderer.run([
                          containerName,
                          'init_keys',
                          JSON.stringify({ ...keyConfig }),
                        ]);
                        setLoading(false);
                        console.log(res);
                        navigate('/instances');
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
        <div
          className="basis-[12%]"
          style={{
            background:
              'linear-gradient(180deg, rgba(31, 94, 255, 0.1) 0%, rgba(49, 53, 117, 0.1) 100%)',
            backdropFilter: 'blur(50px)',
          }}
        ></div>
      </div>
    );
};

export default AddInstance;
