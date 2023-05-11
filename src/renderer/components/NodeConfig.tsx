import { SetStateAction, useState } from 'react';

const configFields = [
  'chain_rpc_addresses',
  'handshake_enable',
  'keyring_backend',
  'node_ipv4_address',
  'node_listen_on',
  'node_moniker',
  'node_price',
  'node_provider',
  'node_remote_url',
  'node_type',
  'listen_port',
  'transport',
];

const format = (str: string) => {
  const words = str.split('_');
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return capitalizedWords.join(' ');
};

const NodeConfig = ({
  config,
  setConfig,
}: {
  config: { [key: string]: string };
  setConfig: React.Dispatch<
    React.SetStateAction<
      | {
          [key: string]: string;
        }
      | undefined
    >
  >;
}) => {
  return (
    <div className="flex flex-col items-center z-50 overflow-auto">
      <div className="min-w-[350px] flex flex-col gap-8">
        {configFields.map((field, index) => {
          if (
            (config && config!['node_type'] === 'v2ray') ||
            field !== 'transport'
          )
            return (
              <div key={`config_${index}`}>
                <div className="text-text-color font-medium text-2xl">
                  {format(field)}
                </div>
                <div className="w-full bg-[#1E2148] rounded-lg px-5 py-3 mt-2">
                  <input
                    type="text"
                    value={config[field]}
                    onChange={(e) =>
                      setConfig((prev) => {
                        return { ...prev, [field]: e.target.value };
                      })
                    }
                    className="bg-transparent text-text-color text-lg w-full focus:outline-none"
                  />
                </div>
              </div>
            );
          else return null;
        })}
      </div>
    </div>
  );
};

export default NodeConfig;
