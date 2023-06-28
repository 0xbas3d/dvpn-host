import React from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
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

function EditNodeConfig({
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
    <span className="flex flex-col items-center z-50 bg-contain pb-20">
      <span className="w-full flex flex-col items-center justify-center">
        <span className="text-[#839c7b] text-[27px] bg-[#0f0f1b] py-8 px-8 rounded-xl w-full border-[#1c2030] border-2">
          {t(data.edit_node_configuration_description)}
        </span>
        <span className="flex flex-col items-center z-50 w-full mt-4">
          <span className="gap-8 w-full mt-16 lg:grid lg:grid-cols-2">
            {configFields.map((field) => {
              if (
                (config && config!.node_type === 'v2ray') ||
                field !== 'transport'
              )
                return (
                  <span className="w-full mb-10">
                    <span className="text-text-color font-medium text-2xl mb-12 inline-block ml-8">
                      {format(field)}
                      <QuestionMarkCircleIcon className="w-6 h-6 inline ml-2" />
                    </span>
                    <span className="bg-[#0f0f1b] rounded-2xl py-10 border-[#1c2030] border-2">
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
                );
              return null;
            })}
          </span>
        </span>
        <span className="flex items-center mt-20 justify-between text-text-color rounded-full py-4 px-24 z-50 cursor-pointer bg-[#1F5EFF]">
          <span className="text-3xl font-bold">{t(data.submit_label)}</span>
        </span>
      </span>
    </span>
  );
}

export default EditNodeConfig;
