const Loading = () => {
  return (
    <div className="px-48 bg-background-color w-full h-full">
      <div className="fixed left-0 w-full h-full top-0 bg-[url('./images/main-bg.png')] bg-center bg-no-repeat blur-[300px] mix-blend-color-dodge"></div>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full">
          <div className="text-text-color text-2xl font-medium">Loading ..</div>
          <div className="rounded-full w-full bg-white h-4 mt-4">
            <div className="rounded-full h-full bg-[#2169ff] w-[50%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
