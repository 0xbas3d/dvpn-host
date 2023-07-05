import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { InstanceGeneralLayout } from './instance-general-layout.component';

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

const format = (text: string) => {
  return text.split('_').join(' ');
};

export const EditNodeConfig = () => {
  const { t } = useTranslation();

  const [config, setConfig] = useState<Record<string, string>>({});

  const handleSetConfig = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setConfig((prev) => {
      return { ...prev, [field]: e.target.value };
    });
  };

  return (
    <InstanceGeneralLayout>
      <div className="z-50 flex flex-col bg-contain">
        <div className="invisible mb-[28px] text-[36px] font-semibold leading-[36px]">
          {t('edit_node_configuration_label', { ns: 'general' })}
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <span className="w-full rounded-xl border-2 border-[#1c2030] bg-[#0f0f1b] px-8 py-8 text-[27px] text-[#839c7b]">
            {t('stop_node_to_edit_config', { ns: 'general' })}
          </span>
          <div className="z-50 mt-4 flex w-full flex-col items-center">
            <div className="mt-16 w-full gap-8 lg:grid lg:grid-cols-2">
              {configFields.map((field) => {
                if ((config && config.node_type === 'v2ray') || field !== 'transport') {
                  return (
                    <div
                      className="mb-10 w-full"
                      key={field}>
                      <span className="mb-4 ml-8 inline-block text-2xl font-medium capitalize text-text-color">
                        {format(field)}
                        <QuestionMarkCircleIcon className="ml-2 inline h-6 w-6" />
                      </span>
                      <input
                        type="text"
                        value={config[field]}
                        onChange={(e) => {
                          handleSetConfig(e, field);
                        }}
                        className="w-full rounded-2xl border-2 border-[#1c2030] bg-[#0f0f1b] p-10 text-lg text-text-color focus:outline-none"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <span className="z-50 mt-20 flex cursor-pointer items-center justify-between rounded-full bg-[#1F5EFF] px-24 py-4 text-3xl font-bold text-text-color">
            {t('submit_label', { ns: 'general' })}
          </span>
        </div>
      </div>
    </InstanceGeneralLayout>
  );
};
