import * as React from "react";
import {useState, useEffect} from "react";
import styled from 'styled-components';
import axios from 'axios';
import {Slider} from '@material-ui/core';
import {Select, TextField, MenuItem, FormControl, InputLabel, Button} from '@material-ui/core';
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
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [newEmployeeDept, setNewEmployeeDept] = useState('');
  const [newEmployeeAge, setNewEmployeeAge] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: "get",
      url: "http://localhost:8020/request",
    })
    .then((response) => {
      console.log('resp', response.data);
      setData(response.data);
      let depts = response.data.reverse().map((d) => d.department);
      let arr: string[] = Array.from(new Set(depts));
      arr.unshift('All Departments');
      setDepartments(arr);
    })
  }

  const submit = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8020/post",
      data: {
        name: newEmployeeName,
        department: newEmployeeDept,
        age: Number.parseInt(newEmployeeAge),
      }
    })
    .then((response) => {
      if (response.data.message) {
        getData();
      }
    })
  }

  const handleSlide = (event: any, newValue: number | number[]) => {
    setRange(newValue as number[]);
  };

  return (
    <Container>
      <Head>Kiewit Employee Data</Head>
      <div style={{ marginBottom: "10px", fontSize: "18px" }}>Search for Employee</div>
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
            onChange={(e) => setSelectedDept(e.target.value as string)}
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
      <div style={{ marginBottom: "10px", fontSize: "18px" }}>Insert New Employee</div>
      <Inputs>
        <TextField
          style={{ width: "320px", marginRight: "20px" }}
          variant="outlined"
          label="First and Last Name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
        <FormControl variant="outlined" style={{ marginRight: "30px" }}>
          <InputLabel>Department</InputLabel>
          <Select
            style={{ width: "180px" }}
            id="demo-simple-select"
            value={newEmployeeDept}
            onChange={(e) => setNewEmployeeDept(e.target.value as string)}
          >
            {departments.map((d) => <MenuItem value={d}>{d}</MenuItem>)}
          </Select>
        </FormControl>
        <TextField
          style={{ width: "100px", marginRight: "20px" }}
          variant="outlined"
          label="Age"
          value={newEmployeeAge}
          onChange={(e) => setNewEmployeeAge(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={submit}>Submit</Button>
      </Inputs>
      <div style={{ fontSize: "18px" }}>Employees</div>
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
  font-weight: bold;
  font-size: 25px;
  margin: 18px 0px;
`
const Inputs = styled.div`
  display: flex;
  margin-bottom: 20px;
`

export default App;