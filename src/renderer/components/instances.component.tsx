import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'renderer/common/types';
import { useTranslation } from 'react-i18next';
import { InstanceCard } from './instance-card.component';
import { NewInstance } from './new-instance.component.';
import { Loading } from './loading.component';
import logo from '../assets/images/logo.png';

export const Instances = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [containers, setContainers] = useState<Container[]>([]);

  const getContainers = async () => {
    const containerNames: string = await window.electron.ipcRenderer.custom(['#', 'containers']);
    const containerNameObjects = containerNames
      .split('\n')
      .filter((containerName) => {
        return containerName.length > 0;
      })
      .map((container) => {
        return { name: container.slice(10), status: t('general:loading_label') };
      });
    setContainers(containerNameObjects);
  };

  useEffect(() => {
    setLoading(true);
    getContainers();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (containerObj: Container[]) => {
    setContainers(
      await Promise.all(
        containerObj.map(async (container: Container) => {
          const res = await window.electron.ipcRenderer.custom([container.name, 'status']);
          return {
            name: container.name,
            status: res,
          };
        }),
      ),
    );
  };

  useEffect(() => {
    if (containers.length > 0) {
      const interval = setInterval(() => {
        return updateStatus(containers);
      }, 1000);
      return () => {
        return clearInterval(interval);
      };
    }
  }, [containers]);

  if (loading) return <Loading />;
  return (
    <div className="flex min-h-[100vh] w-full flex-col justify-between bg-background-color py-20">
      <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-center bg-no-repeat mix-blend-color-dodge blur-[300px]" />
      <div className="basis-[88%]">
        <div className="flex justify-center">
          <button
            type="button"
            className="z-50"
            onClick={() => {
              return navigate('/');
            }}>
            <img
              src={logo}
              alt={t('general:sentinel_label')}
            />
          </button>
        </div>
        <div className="flex justify-center">
          <div className="mt-36 inline-grid grid-cols-3 gap-6">
            {containers &&
              containers.map((container) => {
                return (
                  <InstanceCard
                    key={`instance_${container.name}`}
                    instance={container}
                  />
                );
              })}
            <NewInstance />
          </div>
        </div>
      </div>
    </div>
  );
};
