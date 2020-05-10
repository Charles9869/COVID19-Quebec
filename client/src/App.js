import React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import GlobalStyles from './components/GlobalStyles';
import Header from './components/Header';
import Footer from './components/Footer';
import Chart from './components/Chart';

const App = () => {
  const [date, setDate] = React.useState(
    format(new Date(), 'EEEE, LLLL do yyyy')
  );
  const [totalCases, setTotalCases] = React.useState(0);
  const [cases, setCases] = React.useState([]);
  const [deaths, setDeaths] = React.useState([]);

  // Set number of cases
  React.useEffect(() => {
    fetch('http://localhost:4000/cases')
      .then((res) => res.json())
      .then((data) => {
        const total = data.reduce((a, b) => {
          return { number: a.number + b.number };
        });
        setTotalCases(total.number);
        setCases(data);
      });
  }, []);

  // Set number of deaths
  React.useEffect(() => {
    fetch('http://localhost:4000/deaths')
      .then((res) => res.json())
      .then((data) => setDeaths(data));
  }, []);

  return (
    <div>
      <Header />
      <InfoContainer>
        <Title>
          As of <strong>{date}</strong>, Quebec has
        </Title>
        <TotalCases>{totalCases}</TotalCases>
        <Title>confirmed COVID-19 cases</Title>
      </InfoContainer>
      <SubTitle>Cases per region</SubTitle>
      <Chart data={cases} label={'Cases per region'} color={'#870000'} />
      <SubTitle>Deaths per region</SubTitle>

      <Chart data={deaths} label={'Deaths per region'} color={'#67B7DC'} />
      <Footer />
      <GlobalStyles />
    </div>
  );
};

const InfoContainer = styled.div`
  margin-top: 20px;
`;
const Title = styled.p`
  font-size: 30px;
  text-align: center;
`;

const SubTitle = styled.h3`
  text-align: center;
  margin-top: 30px;
`;

const TotalCases = styled.h1`
  color: #870000;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
`;

export default App;
