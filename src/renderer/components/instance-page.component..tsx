import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { routeConst } from 'renderer/common/types/consts/route-const.common';
import { NodeTopBar } from './node-top-bar.component';
import { NodeSideBar } from './node-side-bar.component';
import { EditNodeConfig } from './edit-node-config.component';

export const InstancePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="flex min-h-[100vh] w-full flex-col bg-background-color">
      <div className="basis-[88%] overflow-auto">
        <div className="flex h-full flex-col justify-between px-20 pb-5 pt-10">
          <div>
            <div className="fixed left-0 top-0 h-full w-full bg-[url('../assets/images/main-bg.png')] bg-center bg-no-repeat mix-blend-color-dodge blur-[300px]" />
            <NodeTopBar />
            <div className="mt-[35px] flex h-full gap-[39px]">
              <div>
                <div className="mb-[35px] flex items-center gap-[31px]">
                  <ArrowLeftIcon
                    className="z-[9999] cursor-pointer text-text-color"
                    width={36}
                    onClick={() => {
                      return navigate(routeConst.instances);
                    }}
                  />
                  <span className="text-[32px] font-semibold text-white">{params.name}</span>
                </div>
                <NodeSideBar />
              </div>
              <div>
                <div className="mb-[35px] text-[32px] font-semibold text-white">
                  Edit Node Configuration
                </div>
                <EditNodeConfig />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
