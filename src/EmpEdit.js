import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios, { all } from "axios";

const EmpEdit = () => {
    const { empid } = useParams();
    const [allEmploye, setAllEmploye] = useState([]);
    const [rowData, setRowData] = useState([]);

    const [empDetails , setEmpDetails] = useState({});
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);

    useEffect(() => {
        axios.get(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails.json/`).then((result) => {
            let arr = Object.values(result.data);
            setRowData(result.data);
          let obj = Object.values(arr.find(ele => Object.values(ele)[0].id == empid))[0];
         
        //   console.log(Object.values(obj), "Perticular obj");
        idchange(obj.id);
        namechange(obj.name);
        emailchange(obj.email);
        phonechange(obj.phone);
        activechange(obj.active);
          setEmpDetails(obj);
        //   setEmpData(arr.map((ele) => {
        //     const item = Object.values(ele[1])[0];
        //     return { id: ele[0], ...item };
        //   }));
        }).catch((error) => {
          console.log(error);
        });
      }, []);

    // useEffect(() => {
    //     fetch("https://finalapp-f4ed7-default-rtdb.firebaseio.com/postData" + empid).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         idchange(resp.id);
    //         namechange(resp.name);
    //         emailchange(resp.email);
    //         phonechange(resp.phone);
    //         activechange(resp.isactive);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     })
    // }, []);

    


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        const updatedDetails=
        {
            "active": active,
            "email": email,
            "id": empid,
            "name": name,
            "phone": phone
        }
           let tempArry = [];
          let arr = rowData;

        //   console.log(arr , "arr")
        //    for(var i = 0 ; i < allEmploye.length ; i++){
        //        console.log(allEmploye[i] , "i" , empid)
        //        if(allEmploye[i][0] !== empid){
        //            console.log(allEmploye[i][0] !== empid, "2")
        //            tempArry.push(allEmploye[i]);
        //         }
        //     }
        let tempobj = {};
        for(let [key , val] of Object.entries(arr)){
            if(key == empid){
                arr[key]= {"random" : updatedDetails}
            }
        }

        
            
        //     console.log(allEmploye.length , tempArry.length , "size")
        // // var tempArry =allEmploye.filter(data => data[0] !== empid);
        // console.log(allEmploye)
        // console.log(tempArry)
        // tempArry.push([empid ,updatedDetails]);
        // console.log(tempArry)


        // var obj =  tempArry.reduce((acc, cur) =>
 
        // ({ ...acc, [cur[0]]: {"random": cur[1]}})
        
        // , {})

        // console.log(obj , "Obj")

        axios.put(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails/` + ".json", arr ).then((e) => {
            console.log("Data updated")
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })

        // axios.put(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails/` + ".json", obj ).then((e) => {
        //     console.log("Data updated")
        //     navigate('/');
        // }).catch((error) => {
        //     console.log(error);
        // })

        // axios.put(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails/` + ".json" , obj ).then((e) => {
        //     console.log("Data removed")
        //     navigate('/');
        // }).catch((error) => {
        //     console.log(error);
        // })

        // fetch("https://finalapp-f4ed7-default-rtdb.firebaseio.com/postData"+obj,{
        //     method:"PUT",
        //     headers:{"content-type":"application/json"},
        //     body:JSON.stringify(empdata)
        // }).then((res)=>{
        //     alert('Saved successfully.')
        //     navigate('/');
        // }).catch((err)=>{
        //     console.log(err.message)
        // })

    }
    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Employee Edit</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input defaultValue={empDetails.id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                            {name.length == 0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                   <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input  value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input  checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                            <label  className="form-check-label">Is Active</label>

                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default EmpEdit;
