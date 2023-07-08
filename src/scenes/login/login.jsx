import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { postFetch } from "../../commons/ApiMethods";
import './login.css';
import { Box } from "@mui/material";
import Header from "../../components/Header";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
                user: {
                    email: username,
                    password: password,
                },
            };
            try {
                const response = await postFetch('login', inputobj);
                if (response.error) {
                    toast.error(response.error);
                } else {
                    const { token, user } = response;
                    const category_name = user.category.category_name;
                    const allowedCategoryIds = [2]; // Specify the allowed category IDs for this app

                    if (allowedCategoryIds.includes(user.category_id)) {
                        sessionStorage.setItem('token', token);
                        sessionStorage.setItem('isLoggedIn', true);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('category_name', category_name);
                        props.setIsLoggedIn(true);
                        navigate('/dashboard');
                        toast.success('Success');
                    } else {
                        toast.error('You are not allowed to log in.');
                    }
                }
            } catch (err) {
                toast.error('Login Failed due to :' + err.message);
            }
        }
    };

    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
            console.log(1);
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
            console.log(2);
        }
        return result;
    }

    return (
        <Box m="20px">
            <ToastContainer />
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
                        <Header title="Login" subtitle="Bienvenido!" />
                    </Box>
                    <p text-gray-500 mb-5 style={{ color: 'blue' }} >Please enter your login and password</p>
                    <form onSubmit={proceedLoginUsingAPI}>
                        <Box mb="20px">
                            <TextField
                                InputLabelProps={{
                                    style: { color: '#000' },
                                }}
                                sx={{
                                    "& .MuiInputLabel-root": { color: 'green' },
                                    "& .MuiFilledInput-input": { border: '1px solid blue', borderRadius: 1 },
                                    "& .MuiInputBase-root": {
                                        color: 'primary.main'
                                    }
                                }}
                                InputProps={{ disableUnderline: true }}
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
                                    "& .MuiInputLabel-root": { color: 'green' },
                                    "& .MuiFilledInput-input": { border: '1px solid blue', borderRadius: 1 },
                                    "& .MuiInputBase-root": {
                                        color: 'primary.main'
                                    }
                                }}
                                InputProps={{ disableUnderline: true }}
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
                </Box>
            </Box>
        </Box>
    );
}

export default Login;