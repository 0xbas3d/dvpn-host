import { PropsWithChildren } from 'react';
import { NodeTopBar } from './node-top-bar.component';
import { NodeSideBar } from './node-side-bar.component';

export const InstanceGeneralLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-[100vh] w-full pb-[52px]">
      <div className="fixed left-[0px] top-[0px] z-[-1] h-[100vh] w-[100vw] bg-[#090A13] bg-[url('./images/bg-effect.png')] bg-cover  bg-center  bg-no-repeat" />
      <NodeTopBar />
      <div className="flex flex-col gap-[39px] pl-[50px] pr-[60px] pt-[35px] lg:flex-row">
        <NodeSideBar />
        {children}
      </div>
    </div>
  );
};
