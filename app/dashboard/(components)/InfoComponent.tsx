/**
 * InfoComponent is a component that displays information in a label-value format.
 */
const InfoComponent = ({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row md:flex-wrap w-full my-2 md:gap-2 leading-tight text-white ${className}`}
    >
      <div className="md:w-[100px] font-semibold text-blumine-200 ">
        {label}
      </div>
      <>{children || "Loading..."}</>
    </div>
  );
};

export default InfoComponent;
