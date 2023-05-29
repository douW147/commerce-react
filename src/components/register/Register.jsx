import React, {useState, useEffect, useRef, useContext} from "react";
import "./index.css";
import { useDispatch } from 'react-redux';
import userSlice from "../../slices/userSlice.js";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Register(props) {
    const [show, setShow] = useState(false);

    const [state, setState] = useState({
        email: "",
        password: "",
        name: "",
        date: "",
        gender: "",
        country: "Uk",
        countries: ["Uk", "USA", "Spain"]
    });

    const [errors, setErrors] = useState({
        email: [],
        password: [],
        name: [],
        date: [],
        gender: [],
        country: []
    });

    const [dirty, setDirty] = useState({
        email: false,
        password: false,
        name: false,
        date: false,
        gender: false,
        country: false
    });

    const isInitialMount = useRef(true);

    const [message, setMessage] = useState("")

    const myEmailRef = useRef();

    const dispatch = useDispatch();

    useEffect(() => {  // initial only
        document.title = "Register - 07-11"
    }, []);

    useEffect(() => {
        // myEmailRef.current.focus();
    },[])

    useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
            validateFields();
        }
    }, [state]);    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeHandler = (event) => {
        setState({...state, [event.target.name]: event.target.value})
    }

    const validateFields = () => {
        let errorsData = {};
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i;
        const password_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        errorsData.email = [];
        if (state.email.length === 0){
            errorsData.email.push("Поле не может бути порожнім")
        } else {
            if(!email_regex.test(state.email)){
                errorsData.email.push("Email введений не правильно")
            }
        }

        errorsData.password = [];
        if (!state.password){
            errorsData.password.push("Поле не может бути порожнім")
        } else {
            if(!password_regex.test(state.password)){
                errorsData.password.push("Пароль повинен мати хоча б одну цифру і велику літеру")
            }
        }

        errorsData.name = [];
        if (!state.name){
            errorsData.name.push("Поле не может бути порожнім")
        }

        errorsData.date = [];
        if (!state.date){
            errorsData.date.push("Поле не может бути порожнім")
        }

        errorsData.gender = [];
        if (!state.gender){
            errorsData.gender.push("Поле не может бути порожнім")
        }

        errorsData.country = [];
        if (!state.country){
            errorsData.country.push("Поле не может бути порожнім")
        }
        setErrors(errorsData);
    }

    const isValid = () => {
        for(let error in errors){
            if (errors[error].length > 0){
                return false
            };
        }
        return true
    }

    const onSubmit = () => {
        let dirtyData = dirty;
        Object.keys(dirty).forEach(name => {
            if (errors[name]) {
                dirtyData[name] = true
            }
        })
        setDirty(dirtyData);
        validateFields("",  ( async () => {
            if (isValid() === true){
                let response = await fetch("http://localhost:5000/users", {method: "POST",
                body: JSON.stringify({
                    email: state.email,
                    password: state.password,
                    fullName: state.name,
                    dateOfBirth: state.date,
                    gender: state.gender,
                    country: state.country,
                    receiveNewsLetters: false,
                    role: "user"
                }),
                headers: {
                    "Content-type": "application/json"
                }});
                if (response.ok){
                    const responseBody = await response.json();
                    const user = {
                        userName: responseBody.fullName,
                        userId: responseBody.id,
                        userRole: responseBody.role
                    }
                    dispatch(userSlice.actions.login(user));
                    props.history.replace("/dashboard");
                    setMessage(<span className="text-success">Успішно зареєстровано</span>);
                } else {
                    setMessage(<span className="text-danger">Помилка при реєструванні</span>);
                }
            } else {
                setMessage(<span className="text-danger">Заповніть всі поля правильно</span>)
            };
        })());
    }

    const renderErrorStyle = (value) => {
        if (dirty[value] && errors[value].length > 0){
            return {borderColor: "red", 
            backgroundColor: "rgba(255,0,0,0.20)", 
            boxShadow: "0px 0px 8px 2px rgba(255,0,0,0.25)"}
        } else {
            return {}
        }
    };    

    return(
        <div className="row mt-4">
            <div className="col-lg-6 col-md-8 mx-auto">
                <form>
                    <div className="card shadow">
                        <div className="card-header mt-1">
                            <h2>Реєстрація</h2>
                        </div>
                        <div className="card-body border-bottom">

                            <div className="form-group form-row row mb-2">
                                <label className="col-lg-4 label" htmlFor="email" >Email</label>
                                <div className="col-lg-8">
                                    {dirty.email && errors.email && <span className="text-danger">{errors.email}</span>}
                                    <input
                                    ref={myEmailRef}
                                    style={renderErrorStyle("email")}
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value = {state.email}
                                    type="email"
                                    onChange={(event) => {onChangeHandler(event)}}
                                    onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row row mb-3">
                                <label className="col-lg-4 label" htmlFor="password" >Password</label>
                                <div className="col-lg-8">
                                    {dirty.password && errors.password && <span className="text-danger">{errors.password}</span>}
                                    <input
                                    style={renderErrorStyle("password")}
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    value = {state.password}
                                    type="password"
                                    onChange={(event) => {onChangeHandler(event)}}
                                    onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row row mb-2">
                                <label className="col-lg-4 label" htmlFor="name">Full name</label>
                                <div className="col-lg-8">
                                    {dirty.name && errors.name && <span className="text-danger">{errors.name}</span>}
                                    <input
                                    style={renderErrorStyle("name")}
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    value = {state.name}
                                    type="text"
                                    onChange={(event) => {onChangeHandler(event);}}
                                    onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row row mb-2">
                                <label className="col-lg-4 label" htmlFor="date">Date of Birth</label>
                                <div className="col-lg-8">
                                    {dirty.date && errors.date && <span className="text-danger">{errors.date}</span>}
                                    <input
                                    style={renderErrorStyle("date")}
                                    className="form-control"
                                    name="date"
                                    id="date"
                                    value = {state.date}
                                    type="date"
                                    onChange={(event) => {onChangeHandler(event)}}
                                    onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row row ">
                                <label className="col-lg-4 label">Gender</label>
                                <div className="col-lg-8">
                                    {dirty.gender && errors.gender && <span className="text-danger">{errors.gender}</span>}
                                    <div className="form-check">
                                        <input
                                        style={renderErrorStyle("gender")}
                                        className="form-check-input"
                                        name="gender"
                                        id="female"
                                        value = "female"
                                        type="radio"
                                        onChange={(event) => {onChangeHandler(event)}}
                                        checked={state.gender === "female" ? true : false}
                                        onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                        />
                                        <label className="form-check-inline" htmlFor="female">Female</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                        style={renderErrorStyle("gender")}
                                        className="form-check-input"
                                        name="gender"
                                        id="male"
                                        value = "male"
                                        type="radio"
                                        onChange={(event) => {onChangeHandler(event)}}
                                        checked={state.gender === "male" ? true : false}
                                        onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                        />
                                        <label className="form-check-inline" htmlFor="male">Male</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-row row mt-3">
                                <label className="col-lg-4 label" htmlFor="country">Country</label>
                                    <div className="col-lg-8">
                                        {dirty.country && errors.country && <span className="text-danger">{errors.country}</span>}
                                        <select
                                        style={renderErrorStyle("country")}
                                        className="form-select"
                                        name="country"
                                        id="country"
                                        value = {state.country}
                                        onChange={(event) => {onChangeHandler(event)}}
                                        onBlur={(event) => {
                                        setDirty({email: false, password: false, name: false, date: false, gender: false, country: false, [event.target.name]: true});
                                        validateFields();
                                    }}
                                        >
                                            {state.countries.map((country, index) => {
                                                return <option key={index} value={country}>
                                                    {country}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                            </div>
                        </div>
                        <div className="mt-1 float-right">
                            {message}
                        </div>
                        <div className="card-footer float-right">
                            <button className="btn btn-dark" type="submit" onClick={(event) => {onSubmit(); event.preventDefault();}}>Зареєструватися</button>
                        </div>
                    </div>
                </form>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>On login modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Register;