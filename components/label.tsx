import Price from './price';

const Label = ({
  title,
  amount,
  currencyCode
}: {
  title: string;
  amount: string;
  currencyCode: string;
}) => {
  return (
    <div className="w-full @container/label">
      <div className="flex items-center justify-between p-1 pt-2 text-xs">
        <h3 className="line-clamp-2 flex-grow font-hta text-lg leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none p-2"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
