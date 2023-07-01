export type InstanceInfoProps = {
  div1Heading: string;
  div1SubHeading: number;
  div1Text: string;
  div2Heading: string;
  div2SubHeading: number;
  div2Text: string;
  div3Heading: string;
  div3SubHeading: number;
  div3Text: string;
};

export const InstanceInfo = ({
  div1Heading,
  div1SubHeading,
  div1Text,
  div2Heading,
  div2SubHeading,
  div2Text,
  div3Heading,
  div3SubHeading,
  div3Text,
}: InstanceInfoProps) => {
  const boxStyle = ' mr-3 px-6 py-12 mt-7 border-2  bg-[#0F131A] rounded-2xl border-[#171d28]';
  const boxText = 'text-[32px] font-bold text-white';
  const headingStyle = 'mr-[1.5px] basis-11/12 pr-2 text-[20px] font-medium text-[#808080]';
  const subHeadingStyle = 'basis-1/12 pt-1 text-[16px] font-medium text-[#70BF86]';
  return (
    <div className="grid grid-cols-2 lg:w-full lg:grid-cols-3">
      <div className={boxStyle}>
        <div className="flex flex-row pb-8">
          <p className="mr-[1.5px] w-fit basis-11/12 pr-2 text-[20px] font-medium text-[#808080]">
            {div1Heading}
          </p>
          <p className={subHeadingStyle}>{div1SubHeading}%</p>
        </div>
        <div className={boxText}>{div1Text}</div>
      </div>

      <div className={boxStyle}>
        <div className="flex flex-row pb-8">
          <p className={headingStyle}>{div2Heading}</p>
          <p className={subHeadingStyle}>{div2SubHeading}%</p>
        </div>
        <div className={boxText}>{div2Text}</div>
      </div>

      <div className={boxStyle}>
        <div className="flex w-full flex-row pb-8">
          <p className={headingStyle}>{div3Heading}</p>
          <p className={subHeadingStyle}>{div3SubHeading}%</p>
        </div>
        <div className={boxText}>{div3Text}</div>
      </div>
    </div>
  );
};
