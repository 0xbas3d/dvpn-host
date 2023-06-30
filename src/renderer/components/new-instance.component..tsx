import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { routeConst } from 'renderer/common/types/consts/route-const.common';

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
      className="flex min-w-[401px] flex-col justify-center rounded-[16px] border border-[#192a37] bg-black text-white">
      <img
        alt="plus"
        src="/assets/images/plus.png"
        className="mx-auto"
      />
      <span className="mt-10 w-full text-[22px] font-medium text-text-color">
        {t('general:launch_a_new_node_label')}
      </span>
    </button>
  );
};
