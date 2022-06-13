import React, {useEffect, useState, useRef, useContext} from "react";
import { Link } from "react-router-dom";
import "./index.css"
import { userContext } from "../userContext.js";

function Login(props) {

    const [email, setEmail] = useState("sashok1111122222@gmail.com");
    const [password, setpassword] = useState("Cupofcoffe1");
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    });
    const [errors, setErrors] = useState({
        email: [],
        password: []
    });

    const [message, setMessage] = useState("");

    const currentUser = useContext(userContext);
    

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
            let response = await fetch(`http://localhost:5000/users?email=${email}&password=${password}`, {method: "GET",});
            if (response.ok){
                let responseBody = await response.json();
                if (responseBody.length > 0) {
                    currentUser.setUser({
                        ...currentUser.user,
                        isLoggedIn: true,
                        userName: responseBody[0].fullName,
                        userId: responseBody[0].id,
                        userRole: responseBody[0].role
                    });
                    props.history.replace("/dashboard");
                }
            } else {
                setMessage(<span className="text-danger">Помилка при реєструванні</span>);
            }
        } else {
            setMessage(<span className="text-danger">Заповніть всі поля правильно</span>)
        };
    }

    return(
        <div className="row">
            <div className="col-lg-5 col-md-7 mx-auto">
                <div className="card shadow-lg my-2">
                    <div className="card-header">
                        <h4 className="text-center">Вход в личный кабинет</h4>
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
                                    placeholder="Ваша почта"
                                    className="form-control"
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    onBlur={() => {
                                            setDirty({email: true, password: false});
                                            validateFields();
                                        }}
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
                                <Link to="/register" className="btn btn-dark">Зарегестрироваться</Link>
                                <button onClick={(event) => {onLogin(); event.preventDefault();}} type="submit" className="btn btn-dark">Войти</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    )
}

export default Login;