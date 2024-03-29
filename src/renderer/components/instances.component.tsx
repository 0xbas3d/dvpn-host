import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Container } from 'renderer/common/types';
import { InstanceCard } from './instance-card.component';
import { Loading } from './loading.component';
import { NewInstance } from './new-instance.component';

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
        return { name: container.slice(10), status: t('loading_label', { ns: 'general' }) };
      });
    setContainers(containerNameObjects);
  };

  useEffect(() => {
    setLoading(true);
    getContainers();
    setLoading(false);
    getContainers().finally(() => {
      setLoading(false);
    });
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

  const navigateToMainPage = () => {
    navigate('/');
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
    <div className="min-h-screen w-full bg-[#090A13] bg-[url('./images/page-bg.png')]  bg-cover  bg-center bg-no-repeat p-0 bg-blend-difference">
      <div className="basis-[88%]">
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            className="z-50 pt-20 text-[96px] text-white"
            onClick={navigateToMainPage}>
            {t('instances_label', { ns: 'general' })}
          </button>
          <div className="text-[40px] font-[400px] leading-[34.5px] text-white">
            {t('launch_a_new_node_label', { ns: 'general' })}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="mt-28  inline-grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
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
