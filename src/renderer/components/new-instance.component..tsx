import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import plus from '../assets/images/plus.png';

export const NewInstance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddNewInstance = async () => {
    navigate('/addInstance');
  };

  return (
    <button
      type="button"
      tabIndex={0}
      onClick={handleAddNewInstance}
      className="flex min-w-[401px] cursor-pointer flex-col rounded-[16px] border border-[#192a37]  bg-black text-white ">
      <img
        alt="plus"
        src={plus}
        width={63}
        height={63}
        className="relative left-[50%] translate-x-[-50%] translate-y-[80%]"
      />
      <span className="mt-20 w-full text-[22px] font-medium text-text-color">
        {t('general:launch_a_new_node_label')}
      </span>
    </button>
  );
};
