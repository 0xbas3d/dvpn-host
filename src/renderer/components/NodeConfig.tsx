import React from 'react';
import { twJoin } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import data from './general.json';

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

function NodeConfig({
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
}) {
  const { t } = useTranslation();

  return (
    <span className="flex flex-col items-center z-50 bg-contain bg-[url('./images/instances-bg-new.png')] pb-20">
      <span className="w-9/12 flex flex-col items-center justify-center">
        <span className="text-text-color font-bold text-4xl mt-20 text-center">
          {t(data.node_configuration_label)}
        </span>
        <span className="flex items-center mt-20 justify-between text-text-color rounded-full py-5 px-16 z-50 cursor-pointer bg-[#1F5EFF]">
          <span className="text-3xl font-bold">Auto Fill</span>
        </span>
        <span className="w-7/12">
          <p className="text-[#444251] text-xl font-bold mt-10 text-center">
            {t(data.auto_fill_description)}
          </p>
        </span>
        <span className="flex flex-col items-center z-50 w-9/12 mt-4">
          <span className="flex flex-col gap-8 w-full mt-16">
            {configFields.map((field) => {
              if (
                (config && config!.node_type === 'v2ray') ||
                field !== 'transport'
              )
                return (
                  <span className="xl:flex xl:grid-col-2 w-full gap-14 ml-5 mb-16">
                    <span className="w-full xl:w-4/12">
                      <span className="text-[#808080] font-medium text-xl mb-10 inline-block ml-8">
                        {format(field)}
                      </span>
                      <span className="bg-[#0f0f1b] rounded-2xl py-6 border-[#1c2030] border">
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
                      </span>
                    </span>
                    <span className="w-full xl:w-7/12 xl:mt-0">
                      <span
                        className={twJoin(
                          'text-[#808080] font-medium text-xl ml-6 inline-block',
                          field === 'chain_rpc_addresses'
                            ? 'mb-10 mt-10 xl:mt-0'
                            : 'mb-[60px]'
                        )}
                      >
                        {field === 'chain_rpc_addresses' ? 'Details' : ''}
                      </span>
                      <span className="bg-[#0f0f1b] rounded-2xl mt-2 py-6 border-[#1c2030] border">
                        <input
                          type="text"
                          value="Lorem ipsum dolor sit amet consectetur adipisicing"
                          disabled
                          className="bg-transparent text-text-color text-lg w-full focus:outline-none px-6 font-medium"
                        />
                      </span>
                    </span>
                  </span>
                );
              return null;
            })}
          </span>
        </span>
      </span>
    </span>
  );
}

export default NodeConfig;
