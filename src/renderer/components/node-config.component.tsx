import { SetStateAction, Dispatch } from 'react';

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

export const NodeConfig = ({
  config,
  setConfig,
}: {
  config: { [key: string]: string };
  setConfig: Dispatch<
    SetStateAction<
      | {
          [key: string]: string;
        }
      | undefined
    >
  >;
}) => {
  return (
    <div className="z-50 flex flex-col items-center overflow-auto">
      <div className="flex min-w-[350px] flex-col gap-8">
        {configFields.map((field) => {
          if ((config && config!.node_type === 'v2ray') || field !== 'transport') {
            return (
              <div key={field}>
                <div className="text-2xl font-medium text-text-color">{format(field)}</div>
                <div className="mt-2 w-full rounded-lg bg-[#1E2148] px-5 py-3">
                  <input
                    type="text"
                    value={config[field]}
                    onChange={(e) => {
                      return setConfig((prev) => {
                        return { ...prev, [field]: e.target.value };
                      });
                    }}
                    className="w-full bg-transparent text-lg text-text-color focus:outline-none"
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};
