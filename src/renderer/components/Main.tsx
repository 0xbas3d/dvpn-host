import React from 'react';
import DVPNInterface from '../interface';
import logo from '../images/logo.png';
import earth from '../images/bg-earth.png';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import HomeButton from './HomeButton';
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const [containers, setContainers] = React.useState<string[]>([]);
  const [currentContainer, setCurrentContainer] = React.useState<string>();
  const [newContainer, setNewContainer] = React.useState<string>();
  const [defaultConfig, setDefaultConfig] = React.useState<{
    [key: string]: string;
  }>();
  const navigate = useNavigate();

  const getDefaultConfig = async () => {
    const config: any = (await window.electron.ipcRenderer.default()).split(
      '\n'
    );
    let default_config: { [key: string]: string } = {};
    for (let i = 0; i < config.length - 1; i++) {
      let split = config[i].split('=');
      default_config[split[0]] = split[1];
      if (i == config.length - 2) setDefaultConfig(default_config);
    }
  };

  const getContainers = async () => {
    const containers: string = await window.electron.ipcRenderer.custom([
      '#',
      'containers',
    ]);
    setContainers(
      containers.split('\n').filter((container) => container.length > 0)
    );
  };
  React.useEffect(() => {
    getContainers();
    getDefaultConfig();
  }, []);
  if (currentContainer && defaultConfig)
    return (
      <DVPNInterface
        container={currentContainer}
        setCurrentContainer={setCurrentContainer}
        getContainers={getContainers}
        defaultConfig={defaultConfig}
      />
    );
  else
    return (
      <div className="px-48 pt-32 bg-background-color w-full min-h-full">
        <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-center bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
        <div className="absolute right-0 bottom-0">
          <img src={earth} />
        </div>
        <div className="flex justify-between items-center">
          <div>
            <img src={logo} height={82} />
          </div>
          <div
            onClick={() => navigate('/instances')}
            className="flex items-center border border-border-color text-text-color rounded-full px-8 py-4 cursor-pointer hover:bg-[#1F5EFF] z-50"
          >
            <div className="text-4xl font-medium">Go to Instances &nbsp;</div>
            <div>
              <ArrowRightIcon height={36} width={48} />
            </div>
          </div>
        </div>
        <div className="pt-[300px]">
          <div className="inline-grid gap-20 grid-cols-2">
            <HomeButton text="Sentinel website" />
            <HomeButton text="Docs.sentinel.co" />
            <HomeButton text="Discord/tg link" />
            <HomeButton text="Github Repo link" />
          </div>
        </div>
      </div>
    );
};

export default Main;
