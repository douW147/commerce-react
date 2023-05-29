import React, {useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import "./index.css"
import {useDispatch, useSelector } from 'react-redux';
import userSlice from "../../slices/userSlice";
import { loginUserThunk } from "../../thunks/userthunk";


function Login(props) {

    const [email, setEmail] = useState("Admin@gmail.com");  //        sashok1111122222@gmail.com
    const [password, setpassword] = useState("Admin123"); //        Test12345
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });

    const [message, setMessage] = useState("");
    const user = useSelector(state => state.user);
    const myEmailRef = useRef();

    const dispatch = useDispatch()

    useEffect(() => {  // initial only
        document.title = "Login - 07-11"
    }, []);

    const isInitialMount = useRef(true);

    useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
    } else {
            validateFields();
        }
    }, [email, password]);

    useEffect(() => {
        myEmailRef.current.focus();
    },[])

    useEffect(() => {
        if (user.redirect !== "") {
            props.history.replace(user.redirect);
        }
        setMessage(<span className="text-danger">{user.error}</span>);
    },[user])


    const validateFields = () => {
        let errorsData = {};
        const email_regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{1,})$/i;
        const password_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        errorsData.email = [];
        if (email.length < 1) {
            errorsData.email.push("Поле не может быть пустым");
        } else {
            if(!email_regex.test(email)){
                errorsData.email.push("Email введен не правильно");
            }
        }
        errorsData.password = [];
        if (!password){
            errorsData.password.push("Поле не может быть пустым")
        } else {
            if(!password_regex.test(password)){
                errorsData.password.push("Пароль должен иметь хотя бы одну цифру и большую букву")
            }
        }
        setErrors(errorsData);
    };

    const isValid = () => {
        for(let error in errors){
            if (errors[error].length > 0){
                return false
            };
        }
        return true
    };

    const renderErrorStyle = (value) => {
        if (dirty[value] && errors[value].length > 0){
            return {borderColor: "red", 
            backgroundColor: "rgba(255,0,0,0.20)", 
            boxShadow: "0px 0px 8px 2px rgba(255,0,0,0.25)"}
        } else {
            return {}
        }
    };  

    const onLogin = async () => {
        validateFields();
        let dirtyData = dirty;
        Object.keys(dirty).forEach(name => {
            if (errors[name]) {
                dirtyData[name] = true
            }
        })
        setDirty(dirtyData)
        if (isValid()){
            dispatch(loginUserThunk({email: email, password: password, history: props.history}))
        } else {
            setMessage(<span className="text-danger">Заповніть всі поля правильно</span>)
        };
    }

    return(
        <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto">
                <div className="card shadow-lg my-2">
                    <div className="card-header">
                        <h4 className="text-center">Вхід в особистий кабінет</h4>
                    </div>
                        <form>
                            <div className="card-body">
                                <div className="form-group">
                                    {dirty.email && errors.email && <span className="text-danger">{errors.email}</span>}
                                    <input 
                                    type="email"
                                    style={renderErrorStyle("email")}
                                    id="email"
                                    name="email"
                                    value={email}
                                    placeholder="Ваша пошта"
                                    className="form-control"
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    onBlur={() => {
                                            setDirty({email: true, password: false});
                                            validateFields();
                                        }}
                                    ref={myEmailRef}
                                    >
                                    </input>
                                </div>
                                <div className="form-group">
                                    {dirty.password && errors.password && <span className="text-danger">{errors.password}</span>}
                                    <input 
                                    type="password"
                                    style={renderErrorStyle("password")}
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Пароль"
                                    className="form-control"
                                    onChange={(event) => {setpassword(event.target.value)}}
                                    onBlur={() => {
                                            setDirty({email: false, password: true});
                                            validateFields();
                                        }}
                                    >
                                    </input>
                                </div>
                                <div className="mt-1 float-right">
                                    {message}
                                </div>
                            </div>
                            <div className="card-footer mb-4">
                                <Link to="/register" className="btn btn-dark">Зареєструватися</Link>
                                {user.status === "pending" && <div id="loading"></div>}
                                <button onClick={(event) => {onLogin(); handleShow(); event.preventDefault();}} type="submit" className="btn btn-dark">Увійти</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default Login;