import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { KeyConfigType } from 'renderer/common/types';

export type AddKeyProps = {
  keyConfig: KeyConfigType;
  setKeyConfig: Dispatch<SetStateAction<KeyConfigType>>;
};

export const AddKey = ({ keyConfig, setKeyConfig }: AddKeyProps) => {
  const [importKey, setImportKey] = useState(false);
  const { t } = useTranslation();

  const handleChangeMnemonic = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyConfig((prev) => {
      return { ...prev, mnemonic: e.target.value };
    });
  };

  const handlePassphraseChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyConfig((prev) => {
      return { ...prev, passphrase: e.target.value };
    });
  };

  return (
    <div className="z-50 flex h-full flex-col items-center justify-center gap-8">
      <div className="flex min-w-[350px] flex-col gap-8">
        <div className="flex w-full justify-between">
          <div className="text-2xl font-medium text-text-color">
            {t('import_key', { ns: 'setup' })}
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <button
                type="button"
                className="h-5 w-5 cursor-pointer rounded-full border-2 border-white bg-transparent p-1"
                onClick={() => {
                  setImportKey(true);
                }}>
                {importKey && <div className="h-full w-full rounded-full bg-[#1F5EFF]" />}
              </button>
              <div className="ml-2 text-lg text-text-color">{t('yes', { ns: 'general' })}</div>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="h-5 w-5 cursor-pointer rounded-full border-2 border-white bg-transparent p-1"
                onClick={() => {
                  setImportKey(false);
                  setKeyConfig((prev) => {
                    return { ...prev, mnemonic: '' };
                  });
                }}>
                {!importKey && <div className="h-full w-full rounded-full bg-[#1F5EFF]" />}
              </button>
              <div className="ml-2 text-lg text-text-color">{t('no', { ns: 'general' })}</div>
            </div>
          </div>
        </div>
        {importKey && (
          <div>
            <div className="text-2xl font-medium text-text-color">
              {t('mnemonic_label', { ns: 'setup' })}
            </div>
            <div className="mt-2 w-full rounded-lg bg-[#1E2148] px-5 py-3">
              <input
                type="text"
                value={keyConfig.mnemonic}
                onChange={handleChangeMnemonic}
                className="w-full bg-transparent text-lg text-text-color focus:outline-none"
              />
            </div>
          </div>
        )}
        <div>
          <div className="text-2xl font-medium text-text-color">
            {t('passphrase_label', { ns: 'setup' })}
          </div>
          <div className="mt-2 w-full rounded-lg bg-[#1E2148] px-5 py-3">
            <input
              type="password"
              value={keyConfig.passphrase}
              onChange={handlePassphraseChange}
              className="w-full bg-transparent text-lg text-text-color focus:outline-none"
            />
          </div>
        </div>
        <div className="text-white">* Passphrase should be atleast 8 characters</div>
      </div>
    </div>
  );
};
