import * as React from "react";
import {useState, useEffect} from "react";
import styled from 'styled-components';

interface EmployeeData {
  name: string;
  department: string;
  age: number;
}

const Employee: React.FC<EmployeeData> = ({name, department, age}) => {

  return (
    <EmployeeCard>
      <Name>{name}</Name>
      <Bottom>
        <div>age: {age}</div>
        <div>{department}</div>
      </Bottom>
    </EmployeeCard>
  )
};

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`
const EmployeeCard = styled.div`
  width: 300px;
  margin: 20px 0px;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 20px;
  border-radius: 6px;
  background: white;
`
const Name = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`

export default Employee;