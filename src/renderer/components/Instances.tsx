import logo from '../images/logo.png';
import InstanceCard from './InstanceCard';
import NewInstance from './NewInstance';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from './Loading';

export type Container = {
  name: string;
  status: string;
};

const Instances = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [containers, setContainers] = useState<Container[]>([]);

  const getContainers = async () => {
    const containerNames: string = await window.electron.ipcRenderer.custom([
      '#',
      'containers',
    ]);
    console.log(containerNames);
    const containers = containerNames
      .split('\n')
      .filter((containerName) => containerName.length > 0)
      .map((container) => {
        return { name: container, status: 'Loading' };
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
  else
    return (
      <div className="flex flex-col justify-between bg-background-color w-full h-full pt-20">
        <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-center bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
        <div className="basis-[88%]">
          <div className="flex justify-center">
            <img
              src={logo}
              className="cursor-pointer z-50"
              onClick={() => navigate('/')}
            />
          </div>
          <div className="flex justify-center">
            <div className="inline-grid grid-cols-3 gap-6 mt-72">
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

export default Instances;
