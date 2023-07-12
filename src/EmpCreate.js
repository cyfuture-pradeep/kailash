import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
//     <link rel="stylesheet" href="styles.css">



const EmpCreate = () => {

    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
        e.preventDefault();
        let id = Math.floor(1000 + Math.random() * 9000);
        const empdata={name,email,phone,active , id : id};
          console.log(empdata)

        axios.post(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/usersDetails/${id}` + ".json" , empdata ).then((e) => {
            console.log("Data added")
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })

        //
        // fetch('https://finalapp-f4ed7-default-rtdb.firebaseio.com/postData/' + empdata.name, empdata, {
        //     method:"POST",
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
        <div className="container">
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{textAlign : "left"}}>
                            <div className="card-title">
                                <h2>Employee Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>ID</label>
                                            <input value={id} disabled="disabled" className="form-control"></input>
                                        </div>
                                    </div>


                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input required value={name} onMouseDown={e => valchange(true)}
                                                   onChange={e => namechange(e.target.value)} className="form-control"
                                                   id="name" />
                                                {name.length == 0 && validation &&
                                                <span className="text-danger">Enter the name</span>
                                                }
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input value={email} type="email"
                                                   onChange={e => emailchange(e.target.value)} className="form-control"
                                                   id="email" />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input value={phone} type="number"
                                                   onChange={e => phonechange(e.target.value)} className="form-control"
                                                   id="phone" />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">
                                            <input checked={active} onChange={e => activechange(e.target.checked)}
                                                   type="checkbox" className="form-check-input" id="active" />
                                                <label className="form-check-label" htmlFor="active">Is Active</label>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <a href="/" className="btn btn-danger">Back</a>
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

export default EmpCreate;
