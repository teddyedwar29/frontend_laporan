const OverviewCards = ({ data }) => {
  const stats = [
    {
      title: "Total Transaksi",
      value: data.reduce((sum, item) => sum + (item.jmlh_trx || 0), 0),
      growth: "+11.01%",
      color: "bg-blue-50"
    },
    {
      title: "Total Akuisisi",
      value: data.reduce((sum, item) => sum + (item.akuisisi || 0), 0),
      growth: "-0.03%",
      color: "bg-purple-50"
    },
    {
      title: "Total Profit",
      value: data.reduce((sum, item) => sum + (item.profit_upline || 0), 0),
      growth: "+15.03%",
      color: "bg-green-50"
    },
    {
      title: "Total Insentif",
      value: data.reduce((sum, item) => sum + (item.insentif || 0), 0),
      growth: "+6.08%",
      color: "bg-orange-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.color} rounded-lg p-4 shadow-sm`}>
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="text-2xl font-semibold text-gray-900">
              {typeof stat.value === 'number' && stat.title.includes('Total') 
                ? `Rp ${stat.value.toLocaleString('id-ID')}`
                : stat.value.toLocaleString('id-ID')}
            </p>
            <span className={`text-sm ${stat.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
              {stat.growth}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;