import { useState } from 'react';

const Setup = ({
  containerName,
  setContainerName,
  next,
  setLoading,
}: {
  containerName: string | undefined;
  setContainerName: React.Dispatch<React.SetStateAction<string | undefined>>;
  next: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col items-center justify-center z-50 gap-8 h-full">
      <div>
        <div className="text-text-color font-medium text-2xl">
          Container Name
        </div>
        <div className="w-full bg-[#1E2148] rounded-lg px-5 py-3 mt-2">
          <input
            type="text"
            value={containerName || ''}
            onChange={(e) => setContainerName(e.target.value)}
            className="bg-transparent text-text-color text-lg w-full focus:outline-none"
          />
        </div>
      </div>
      <div
        onClick={() => {
          if (containerName === undefined || containerName === '')
            alert('Container name cannot be empty');
          else {
            setLoading(true);
            window.electron.ipcRenderer
              .run([containerName, 'setup'])
              .then((res) => {
                setLoading(false);
                next();
              });
          }
        }}
        className="inline-block rounded-full border border-[#1F5EFF] text-text-color p-6 font-medium text-2xl cursor-pointer hover:bg-[#1F5EFF] z-50"
      >
        Setup/Install
      </div>
    </div>
  );
};

export default Setup;
