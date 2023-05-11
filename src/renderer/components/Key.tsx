import { useNavigate } from 'react-router-dom';
import { SetStateAction, useState } from 'react';
import { KeyConfigType } from './AddInstance';

const Key = ({
  keyConfig,
  setKeyConfig,
}: {
  keyConfig: KeyConfigType;
  setKeyConfig: React.Dispatch<SetStateAction<KeyConfigType>>;
}) => {
  const [importKey, setImportKey] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center z-50">
      <div className="min-w-[350px] flex flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="text-text-color font-medium text-2xl">Import Key</div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <div
                className="w-5 h-5 rounded-full border-2 border-white bg-transparent p-1 cursor-pointer"
                onClick={() => setImportKey(true)}
              >
                {importKey && (
                  <div className="w-full h-full rounded-full bg-[#1F5EFF]"></div>
                )}
              </div>
              <div className="text-text-color ml-2 text-lg">Yes</div>
            </div>
            <div className="flex items-center">
              <div
                className="w-5 h-5 rounded-full border-2 border-white bg-transparent p-1 cursor-pointer"
                onClick={() => {
                  setImportKey(false);
                  setKeyConfig((prev) => {
                    return { ...prev, mnemonic: undefined };
                  });
                }}
              >
                {!importKey && (
                  <div className="w-full h-full rounded-full bg-[#1F5EFF]"></div>
                )}
              </div>
              <div className="text-text-color ml-2 text-lg">No</div>
            </div>
          </div>
        </div>
        {importKey && (
          <div>
            <div className="text-text-color font-medium text-2xl">Mnemonic</div>
            <div className="w-full bg-[#1E2148] rounded-lg px-5 py-3 mt-2">
              <input
                type="text"
                value={keyConfig.mnemonic || ''}
                onChange={(e) =>
                  setKeyConfig((prev) => {
                    return { ...prev, mnemonic: e.target.value };
                  })
                }
                className="bg-transparent text-text-color text-lg w-full focus:outline-none"
              />
            </div>
          </div>
        )}
        <div>
          <div className="text-text-color font-medium text-2xl">Passphrase</div>
          <div className="w-full bg-[#1E2148] rounded-lg px-5 py-3 mt-2">
            <input
              type="password"
              value={keyConfig.passphrase || ''}
              onChange={(e) =>
                setKeyConfig((prev) => {
                  return { ...prev, passphrase: e.target.value };
                })
              }
              className="bg-transparent text-text-color text-lg w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Key;
