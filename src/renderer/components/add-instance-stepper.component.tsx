export const AddInstanceStepper = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex w-[90%] items-center">
        <div className="rounded-full bg-background-color bg-[url('../assets/images/mini-effect.png')] bg-center px-6 py-4 text-2xl font-medium text-text-color mix-blend-color-dodge">
          1
        </div>
        <div className="grow border-t-[0.8px] border-[rgba(241,242,255,0.2)]" />
        <div className="rounded-full bg-background-color bg-[url('../assets/images/mini-effect.png')] bg-center px-6 py-4 text-2xl font-medium text-text-color mix-blend-color-dodge">
          2
        </div>
        <div className="grow border-t-[0.8px] border-[rgba(241,242,255,0.2)]" />
        <div className="rounded-full bg-background-color bg-[url('../assets/images/mini-effect.png')] bg-center px-6 py-4 text-2xl font-medium text-text-color mix-blend-color-dodge">
          3
        </div>
      </div>
      <div className="mt-8 flex w-full justify-between">
        <div className="text-2xl font-medium text-text-color">Setup Dependencies</div>
        <div className="text-2xl font-medium text-text-color">Node Configuration</div>
        <div className="text-2xl font-medium text-text-color">Key Creation/Import</div>
      </div>
    </div>
  );
};
