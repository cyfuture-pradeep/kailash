import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetail = () => {
    const { empid } = useParams();
    const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch('https://finalapp-f4ed7-default-rtdb.firebaseio.com/postData/${empid}.json' )
        //fetch(`https://finalapp-f4ed7-default-rtdb.firebaseio.com/postData/${empid}.json`)

            .then((res) => {
                console.log("Data entered successful")
                return res.json();
            })
            .then((resp) => {
                empdatachange(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <div className="container">
                        <div className="card" style={{ textAlign: "left" }}>
                            <div className="card-title">
                                <h2>Employee Details</h2>
                            </div>
                            <div className="card-body">
                                {empdata && (
                                    <div className="employee-details">
                                        <h2 className="employee-name">
                                            The Employee name is: <b>{empdata.name}</b>{" "}
                                            <span className="employee-id">({empdata.id})</span>
                                        </h2>
                                        <h3>Contact Details</h3>
                                        <div className="contact-details">
                                            <h5 className="contact-item">
                                                Email is: {empdata.email}
                                            </h5>
                                            <h5 className="contact-item">
                                                Phone is: {empdata.phone}
                                            </h5>
                                        </div>
                                        <Link className="back-button" to="/">
                                            Back to Listing
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpDetail;





