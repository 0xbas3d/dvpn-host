import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { twJoin } from 'tailwind-merge';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { useTranslation } from 'react-i18next';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export type ChartDataProps = {
  heading: string;
  type: number;
};

export const ChartData = ({ heading, type }: ChartDataProps) => {
  const { t } = useTranslation();
  const [selectedButton, setSelectedButton] = useState('btn1M');
  const handleClick = (buttonId: any) => {
    setSelectedButton(buttonId);
  };

  const Year = [
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

  const Day = Array.from({ length: 24 }, (_, index) => {
    return index;
  });

  const Month = Array.from({ length: 30 }, (_, index) => {
    return index + 1;
  });

  const randomNumbers = [
    83, 92, 57, 64, 26, 48, 76, 30, 18, 54, 71, 99, 41, 63, 88, 12, 77, 42, 68, 15, 91, 34, 59, 80,
    45, 97, 73, 27, 36, 69,
  ];

  let labels;

  if (selectedButton === 'btn1Y') {
    labels = Year.map(String);
  } else if (selectedButton === 'btn1M') {
    labels = Month.map(String);
  } else if (selectedButton === 'btn1D') {
    labels = Day.map(String);
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
    <div className="mt-7 w-[95%] justify-center rounded-2xl border-2 border-[#171d28] bg-[#0F131A] lg:w-full ">
      <div className=" flex flex-row p-7 ">
        <p className="basis-3/6 text-[28px] font-semibold  lg:basis-[80%] ">{heading}</p>
        <div className="pl-16 text-[16px] font-normal">
          <button
            type="button"
            id="btn1D"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === 'btn1D'
                ? 'bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick('btn1D');
            }}>
            {t('general:one_day_label')}
          </button>
          <button
            type="button"
            id="btn1M"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === 'btn1M'
                ? 'bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick('btn1M');
            }}>
            {t('general:one_month_label')}
          </button>
          <button
            type="button"
            id="btn1Y"
            className={twJoin([
              'mx-2 p-[6px] leading-[15.85px]',
              selectedButton === 'btn1Y'
                ? ' bg-[#1F5EFF] font-extrabold'
                : 'bg-[#211E28] font-normal',
            ])}
            onClick={() => {
              handleClick('btn1Y');
            }}>
            {t('general:one_year_label')}
          </button>
        </div>
      </div>
      <div className={twJoin(['mx-6 w-[95%] py-2', type === 1 ? 'h-[450px]' : 'h-[209px]'])}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </div>
  );
};
