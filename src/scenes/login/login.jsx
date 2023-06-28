import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { postFetch } from "../../commons/ApiMethods";
import './login.css';
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {color} from "chart.js/helpers";
import {blue} from "@mui/material/colors";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    const proceedLoginUsingAPI = async (e) => {
        e.preventDefault();
        if (validate()) {
            let inputobj = {
                "username": username,
                "password": password
            };
            navigate('/dashboard');
            props.setIsLoggedIn(true);
            try {
                const resp = await postFetch('User/Authenticate', inputobj);
                console.log(resp);
                if (1/*Object.keys(resp).length*/ === 0) {
                    toast.error('Login failed, invalid credentials');
                } else {
                    toast.success('Success');
                    sessionStorage.setItem('username', username);
                }
            } catch (err) {
                toast.error('Login Failed due to :' + err.message);
            }
        }
    }


    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return true;
    }

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Box
                    maxWidth="400px"
                    width="100%"
                    p="40px"
                    borderRadius="8px"
                    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
                    bgcolor="#ffffff"
                >
                    <Box display="flex" justifyContent="center" alignItems="center" bgcolor="#ffffff">
                        <Header title="Login" subtitle="Bienvenido!"  />
                    </Box>
                    <p text-gray-500 mb-5 style={{ color:'blue' }} >Please enter your login and password</p>
                    <form onSubmit={proceedLoginUsingAPI}>
                        <Box mb="20px">
                            <TextField
                                InputLabelProps={{
                                    style: { color: '#000' },
                                }}
                                sx={{
                                    "& .MuiInputLabel-root": {color: 'green'},
                                    "& .MuiFilledInput-input": {border: '1px solid blue', borderRadius: 1},
                                    "& .MuiInputBase-root": {
                                        color: 'primary.main'
                                    }
                                }}
                                InputProps={{disableUnderline: true}}
                                variant="filled"
                                id="basic-input"
                                label="Email Address"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Box>
                        <Box mb="20px">
                            <TextField
                                InputLabelProps={{
                                    style: { color: '#000' },
                                }}
                                sx={{
                                    "& .MuiInputLabel-root": {color: 'green'},
                                    "& .MuiFilledInput-input": {border: '1px solid blue', borderRadius: 1},
                                    "& .MuiInputBase-root": {
                                        color: 'primary.main'
                                    }
                                }}
                                InputProps={{disableUnderline: true}}
                                variant="filled"
                                disableUnderline
                                id="basic-input"
                                color="primary"
                                label="Password"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Box>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Login
                        </Button>
                    </form>
                    <p className="mb-0">Don't have an account? <Link to={'/register'} className="text-gray-500 fw-bold">Sign Up</Link></p>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
