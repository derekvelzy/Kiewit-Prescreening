import * as React from "react";
import {useState, useEffect} from "react";
import {employee_data} from '../data';
import styled from 'styled-components';
import {Slider} from '@material-ui/core';
import {Select, TextField, MenuItem, FormControl, InputLabel} from '@material-ui/core';
import Employee from './Employee';

interface EmployeeData {
  name: string;
  department: string;
  age: number;
}

const App = () => {
  const [data, setData] = useState<EmployeeData[]>([]);
  const [search, setSearch] = useState<string>('');
  const [departments, setDepartments] = useState<string[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('');
  const [range, setRange] = useState([18, 50]);

  useEffect(() => {
    setData(employee_data);
    let depts = employee_data.map((d) => d.department);
    let arr = Array.from(new Set(depts));
    arr.unshift('All Departments');
    setDepartments(arr);
  }, []);

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedDept(event.target.value as string);
  };

  const handleSlide = (event: any, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  return (
    <Container>
      <Head>Kiewit Employee Data</Head>
      <Inputs>
      <TextField
        style={{ width: "320px", marginRight: "20px" }}
        variant="outlined"
        label="Search Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FormControl variant="outlined" style={{ marginRight: "30px" }}>
        <InputLabel>Departments</InputLabel>
        <Select
          style={{ width: "180px" }}
          id="demo-simple-select"
          value={selectedDept}
          onChange={handleChange}
        >
          {departments.map((d) => <MenuItem value={d}>{d}</MenuItem>)}
        </Select>
      </FormControl>
      <div>
        <Age>Age: {range[0]} - {range[1]}</Age>
        <Slider
          style={{ width: "300px" }}
          value={range}
          max={100}
          onChange={handleSlide}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
      </Inputs>
      <div>
        {
          data.map((d) => {
            if (
                (d.name.toLowerCase().includes(search.toLowerCase()) || search === '') &&
                (d.age >= range[0] && d.age <= range[1])
              ) {
              if (selectedDept === '' || selectedDept === 'All Departments') {
                return <Employee name={d.name} department={d.department} age={d.age} />
              } else if (d.department === selectedDept) {
                return <Employee name={d.name} department={d.department} age={d.age} />
              }
            }
          })
        }
      </div>
    </Container>
  )
};

const Age = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`
const Container = styled.div`
  margin-left: 20px;
`
const Head = styled.div`
  font-size: 25px;
  margin: 15px 0px;
`
const Inputs = styled.div`
  display: flex;
`
const Search = styled.input`
  width: 320px;
  margin-right: 20px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid rgb(140, 140, 140);
`

export default App;