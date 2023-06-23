import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import InstanceCard from './InstanceCard';
import NewInstance from './NewInstance';
import Loading from './Loading';
import data from './general.json'

export type Container = {
  name: string;
  status: string;
};

function Instances() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [containers, setContainers] = useState<Container[]>([]);

  const getContainers = async () => {
    const containerNames: string = await window.electron.ipcRenderer.custom([
      '#',
      'containers',
    ]);
    const containers = containerNames
      .split('\n')
      .filter((containerName) => containerName.length > 0)
      .map((container) => {
        return { name: container.slice(10), status: 'Loading' };
      });
    setContainers(containers);
  };

  useEffect(() => {
    setLoading(true);
    getContainers();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (containers.length > 0) {
      const interval = setInterval(() => updateStatus(containers), 1000);
      return () => clearInterval(interval);
    }
  }, [containers]);

  const updateStatus = async (containers: Container[]) => {
    setContainers(
      await Promise.all(
        containers.map(async (container: Container) => {
          const res = await window.electron.ipcRenderer.custom([
            container.name,
            'status',
          ]);
          return {
            name: container.name,
            status: res,
          };
        })
      )
    );
  };

  if (loading) return <Loading />;
  return (
    <div className="bg-cover bg-no-repeat bg-blend-difference bg-[url('./images/bg-new2.png')]  bg-[#090A13]  bg-center p-0 w-full min-h-[100vh]">
      <div className="basis-[88%]">
        <div className="flex flex-col justify-center items-center">
          <button
            type="button"
            className="pt-20 text-[96px] cursor-pointer z-50 text-white"
            onClick={() => navigate('/')}
          >
            {t(data.instances_label)}
          </button>
          <div className="text-white text-[40px] font-[400px] leading-[34.5px]">
            {t(data.instance_description)}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="inline-grid  grid-cols-1 md:grid-cols-2 custom:grid-cols-3 gap-6 mt-28">
            {containers &&
              containers.map((container) => (
                <InstanceCard
                  key={`instance_${container.name}`}
                  instance={container}
                />
              ))}

            <NewInstance />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instances;
