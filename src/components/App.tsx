import * as React from "react";
import {useState, useEffect} from "react";
import {employee_data} from '../data';
import styled from 'styled-components';

interface EmployeeData {
  name: string;
  department: string;
  age: number;
}

const App = () => {
  const [data, setData] = useState<EmployeeData[]>([]);

  useEffect(() => {
    setData(employee_data);
  }, [])

  return (
    <div>
      <Head>Kiewit!</Head>
      {data.map((d) => <div>{d.name}</div>)}
    </div>
  )
};

const Head = styled.div`
  color: green;
`

export default App;