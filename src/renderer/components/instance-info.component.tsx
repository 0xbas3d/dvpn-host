import { twJoin } from 'tailwind-merge';

export type InstanceInfoProps = {
  heading: string;
  percentage: number;
  value: string;
};

export const InstanceInfo = ({ heading, percentage, value }: InstanceInfoProps) => {
  const isNegativePercentage = percentage < 0;

  return (
    <div className=" mr-3 mt-7 rounded-2xl border-2 border-[#171d28]  bg-[#0F131A] px-6 py-12">
      <div className="flex flex-row pb-8">
        <p className="mr-[1.5px] w-fit basis-11/12 pr-2 text-[20px] font-medium text-[#808080]">
          {heading}
        </p>
        <p
          className={twJoin([
            'basis-1/12 pt-1 text-[16px] font-medium',
            isNegativePercentage ? 'text-red-500' : 'text-[#70BF86]',
          ])}>
          {percentage}%
        </p>
      </div>
      <div className="text-[32px] font-bold text-white">{value}</div>
    </div>
  );
};
