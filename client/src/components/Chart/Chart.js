import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart = ({ data, label, color }) => {
  const [cases, setCases] = React.useState([]);
  const [provinces, setProvinces] = React.useState([]);

  React.useEffect(() => {
    let caseNumber = [];
    let provincesName = [];

    data.forEach((element) => {
      caseNumber.push(element.number);
      provincesName.push(element.name);
    });

    setCases(caseNumber);
    setProvinces(provincesName);
  }, [data]);

  let chartData = {
    labels: provinces,
    datasets: [
      {
        label: label,
        data: cases,
        backgroundColor: `${color}`,
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} height={90} />
    </div>
  );
};

export default Chart;
