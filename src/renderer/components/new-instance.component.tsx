import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routeConst } from 'renderer/common/consts/route-const.common';
import plus from '../assets/images/plus.png';

export const NewInstance = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAddNewInstance = () => {
    navigate(routeConst.addInstance);
  };

  return (
    <button
      type="button"
      onClick={handleAddNewInstance}
      className="flex min-w-[401px] flex-col justify-center rounded-[16px] border border-[#192a37] bg-black py-12 text-white">
      <img
        alt="plus"
        src={plus}
        className="mx-auto"
      />
      <span className="mt-10 w-full text-[22px] font-medium text-text-color">
        {t('launch_a_new_node_label', { ns: 'general' })}
      </span>
    </button>
  );
};
