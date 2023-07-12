import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const EmpListing = () => {
  const [empdata, setEmpData] = useState([]);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/employee/detail/" + id);
  };

  const LoadEdit = (id) => {
    navigate("/employee/edit/" + id);
  };

  const Removefunction = ({
    active,
    email,
    id,
    name,
    phone
  }) => {
  
  let updatedArray = empdata.filter(data => data.id !== id);
 
  var obj =  updatedArray.reduce((acc, cur) =>
 
  ({ ...acc, [cur.id]: {"random": cur}})
  
  , {})


 setEmpData(updatedArray);
 
 axios.put(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails/` + ".json" , obj ).then((e) => {
     console.log("Data removed")
     navigate('/');
 }).catch((error) => {
     console.log(error);
 })

//    const Removefunction = (id) => {
    // if (window.confirm('Do you want to remove?')) {
    //   fetch("https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails"+"json" + ele.id, {
    //     method: "DELETE"
    //   }).then((res) => {
    //     alert('Removed successfully.');
    //     window.location.reload();
    //   }).catch((err) => {
    //     console.log(err.message);
    //   });
    // }
  };

  useEffect(() => {
    axios.get(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails.json/`).then((result) => {
      let arr = Object.entries(result.data);
      setEmpData(arr.map((ele) => {
        const item = Object.values(ele[1])[0];
        return { id: ele[0], ...item };
      }));
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Employee details with Firebase</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/employee/create" className="btn btn-success">Add New (+)</Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {empdata &&
                empdata.map((ele,id) => {
                  return (
                    
                    <tr key={id}>
                    
                      <td>{id+1}</td>
                      <td>{ele.name}</td>
                      <td>{ele.email}</td>
                      <td>{ele.phone}</td>
                      <td>
                        <a onClick={() => { LoadEdit(ele.id)}} className="btn btn-success">Edit</a>
                        <a onClick= {() => Removefunction(ele)} className="btn btn-danger">Remove</a>
                        <a onClick={() => { LoadDetail(ele.id)}} className="btn btn-primary">Details</a>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpListing;
