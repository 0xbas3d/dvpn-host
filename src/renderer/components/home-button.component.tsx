import { PropsWithChildren } from 'react';

export const HomeButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="z-50 flex cursor-pointer items-center justify-between gap-8 rounded-3xl bg-[linear-gradient(180deg,rgba(31,94,255,0.1)0%,rgba(49,53,117,0.1)100%)] p-6 text-text-color hover:bg-[#1E2142] hover:outline hover:outline-1 hover:outline-[#1F5EFF]">
      <div>&#x2022;</div>
      <div className=" text-4xl font-medium">{children}</div>
      <div>&#x2022;</div>
    </div>
  );
};
