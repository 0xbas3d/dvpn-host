import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { twJoin } from 'tailwind-merge';

enum ButtonType {
  ONE_DAY,
  ONE_MONTH,
  ONE_YEAR,
}

export type ChartDataProps = {
  heading: string;
  type: 'large' | 'small';
};

export const ChartData = ({ heading, type }: ChartDataProps) => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState(ButtonType.ONE_DAY);

  const handleClick = (buttonId: ButtonType) => {
    setSelectedButton(buttonId);
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = Array.from({ length: 24 }, (_, index) => {
    return index;
  });

  const monthDays = Array.from({ length: 30 }, (_, index) => {
    return index + 1;
  });

  const randomNumbers = [
    83, 92, 57, 64, 26, 48, 76, 30, 18, 54, 71, 99, 41, 63, 88, 12, 77, 42, 68, 15, 91, 34, 59, 80,
    45, 97, 73, 27, 36, 69,
  ];

  let labels;

  if (selectedButton === ButtonType.ONE_YEAR) {
    labels = monthNames.map(String);
  } else if (selectedButton === ButtonType.ONE_MONTH) {
    labels = monthDays.map(String);
  } else if (selectedButton === ButtonType.ONE_DAY) {
    labels = days.map(String);
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Number',
        data: randomNumbers,
        backgroundColor: 'rgba(124, 153, 226, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#8A8A8A',
          font: {
            size: 16,
          },
        },
        grid: {
          color: '#161A25',
        },
      },
      x: {
        barThickness: 40,
        grid: {
          display: false,
        },
        ticks: {
          color: '#8A8A8A',
          font: {
            size: 16,
          },
        },
      },
    },

    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-7 justify-center rounded-2xl border-2 border-[#171d28] bg-[#0F131A] lg:w-full ">
      <div className=" flex flex-row p-7 ">
        <p className="basis-3/6 text-[28px] font-semibold  lg:basis-[80%] ">{heading}</p>
        <div className="pl-16 text-[16px] font-normal">
          <button
            type="button"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === ButtonType.ONE_DAY
                ? 'bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick(ButtonType.ONE_DAY);
            }}>
            {t('1d_label', { ns: 'general' })}
          </button>
          <button
            type="button"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === ButtonType.ONE_MONTH
                ? 'bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick(ButtonType.ONE_MONTH);
            }}>
            {t('1m_label', { ns: 'general' })}
          </button>
          <button
            type="button"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === ButtonType.ONE_YEAR
                ? ' bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick(ButtonType.ONE_YEAR);
            }}>
            {t('1y_label', { ns: 'general' })}
          </button>
        </div>
      </div>
      <div className={twJoin(['mx-6 py-2', type === 'large' ? 'h-[450px]' : 'h-[209px]'])}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};
