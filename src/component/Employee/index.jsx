import React, { useState } from 'react';

let employeeCount = 3;
const data = [
  {
    id: 1,
    FirstName: "James",
    LastName: "Morgon",
    DOB: "",
    Designation: "",
    ProfilePhoto: "",
    Experience: ""
  },
  {
    id: 2,
    FirstName: "James",
    LastName: "Morgon",
    DOB: "",
    Designation: "",
    ProfilePhoto: "",
    Experience: ""
  },
  {
    id: 3,
    FirstName: "James",
    LastName: "Morgon",
    DOB: "",
    Designation: "",
    ProfilePhoto: "https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg",
    Experience: ""
  },
];

export default function(props) {
  const [ employees, setEmployees ] = useState(data)
  const [ editIndex, setEditIndex ] = useState(-1)
  const headers = Object.keys(employees[0]);

  function onDelete(index) {
    if (window.confirm("Are you sure you want to delete")) {
      const tmp = [...employees];
      tmp.splice(index, 1);
      setEmployees(tmp);
    }
  }

  function onAdd() {
    const tmp = [...employees];
    employeeCount += 1;
    tmp.push({
      id: employeeCount,
      FirstName: "",
      LastName: "",
      DOB: "",
      Designation: "",
      ProfilePhoto: "",
      Experience: "",
    })
    setEmployees(tmp);
    console.log(tmp.length - 1);
    setEditIndex(tmp.length - 1);
  }

  function onInputChange(index, key, value) {
    const tmp = [...employees];
    tmp[index][key] = value;
    setEmployees(tmp);
  }

  function view(options) {
    if (options.isEditing) {
      return (
        <input
          className="text"
          onChange={(evt) => onInputChange(options.index, options.header, evt.target.value)}
          value={options.value}
        />
      );
    }
    if (options.isImg && options.value.length) {
      return <img src={options.value} alt="photo" />
    }
    return options.value;
  }

  return (
    <div>
      <button onClick={onAdd}>add</button>
      <table>
        <thead>
          {headers.map(header => (
            <th>
              <td>{header}</td>
            </th>
          ))}
            <th>
              <td>
                Operation
              </td>
            </th>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            const isEditing = editIndex == index;
            return (
              <tr>
                {headers.map(header => (
                  <td>
                    {view({
                      isImg: header == "ProfilePhoto",
                      isEditing: isEditing && (header != "id"),
                      index,
                      header,
                      value: employee[header]
                    })}
                  </td>
                ))}
                <td>
                  {!isEditing && (
                    <button
                      onClick={() => onDelete(index)}
                    >delete</button>
                  )}

                  <button
                    onClick={() => setEditIndex( isEditing ? -1 : index)}
                  >{ isEditing ? 'update' : 'edit' }</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
