import { twJoin } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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
  return words.join(' ');
};

export type NodeConfigProps = {
  config: { [key: string]: string };
  setConfig: Dispatch<SetStateAction<Record<string, string> | undefined>>;
};

export const NodeConfig = ({ config, setConfig }: NodeConfigProps) => {
  const { t } = useTranslation();

  const handleSetConfig = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setConfig((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  };

  return (
    <span className="z-50 flex flex-col items-center bg-[url('./images/bg-effect.png')] bg-contain pb-20">
      <span className="flex w-9/12 flex-col items-center justify-center">
        <span className="mt-20 text-center text-4xl font-bold text-text-color">
          {t('node_configuration_label', { ns: 'general' })}
        </span>
        <span className="z-50 mt-20 flex cursor-pointer items-center justify-between rounded-full bg-[#1F5EFF] px-16 py-5 text-text-color">
          <span className="text-3xl font-bold">{t('auto_fill_label', { ns: 'general' })}</span>
        </span>
        <span className="w-7/12">
          <p className="mt-10 text-center text-xl font-bold text-[#444251]">
            {t('auto_fill_config_with_default_parameters_description', { ns: 'general' })}
          </p>
        </span>
        <span className="z-50 mt-4 flex w-9/12 flex-col items-center">
          <span className="mt-16 flex w-full flex-col gap-8">
            {configFields.map((field) => {
              if ((config && config!.node_type === 'v2ray') || field !== 'transport') {
                return (
                  <span
                    className="lg:grid-col-2 mb-16 ml-5 w-full gap-14 lg:flex"
                    key={field}>
                    <span className="w-full lg:w-4/12">
                      <span className="mb-[20px] ml-8 inline-block text-xl font-medium capitalize text-[#808080]">
                        {format(field)}
                      </span>
                      <input
                        type="text"
                        value={config[field]}
                        onChange={(e) => {
                          return handleSetConfig(e, field);
                        }}
                        className="w-full rounded-2xl border border-[#1c2030] bg-[#0f0f1b] py-5 text-lg text-text-color focus:outline-none"
                      />
                    </span>
                    <span className="w-full lg:mt-0 lg:w-7/12">
                      <span
                        className={twJoin(
                          'ml-6 inline-block text-xl font-medium text-[#808080]',
                          field === 'chain_rpc_addresses' ? 'mb-[20px] mt-10 lg:mt-0' : 'mb-10',
                        )}>
                        {field === 'chain_rpc_addresses' && t('details_label', { ns: 'general' })}
                      </span>
                      <input
                        type="text"
                        value="Lorem ipsum dolor sit amet consectetur adipisicing"
                        disabled
                        className="w-full rounded-2xl border border-[#1c2030] bg-[#0f0f1b] px-6 py-5 text-lg font-medium text-text-color focus:outline-none"
                      />
                    </span>
                  </span>
                );
              }
              return null;
            })}
          </span>
        </span>
      </span>
    </span>
  );
};
