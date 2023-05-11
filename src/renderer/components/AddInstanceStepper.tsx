const AddInstanceStepper = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between">
      <div className="flex items-center w-[90%]">
        <div className="rounded-full py-4 px-6 text-2xl font-medium text-text-color bg-background-color bg-[url('./images/mini-effect.png')] bg-center mix-blend-color-dodge">
          1
        </div>
        <div className="border-t-[0.8px] border-[rgba(241,242,255,0.2)] grow"></div>
        <div className="rounded-full py-4 px-6 text-2xl font-medium text-text-color bg-background-color bg-[url('./images/mini-effect.png')] bg-center mix-blend-color-dodge">
          2
        </div>
        <div className="border-t-[0.8px] border-[rgba(241,242,255,0.2)] grow"></div>
        <div className="rounded-full py-4 px-6 text-2xl font-medium text-text-color bg-background-color bg-[url('./images/mini-effect.png')] bg-center mix-blend-color-dodge">
          3
        </div>
      </div>
      <div className="flex justify-between mt-8 w-full">
        <div className="text-text-color text-2xl font-medium">
          Setup Dependencies
        </div>
        <div className="text-text-color text-2xl font-medium">
          Node Configuration
        </div>
        <div className="text-text-color text-2xl font-medium">
          Key Creation/Import
        </div>
      </div>
    </div>
  );
};

export default AddInstanceStepper;
