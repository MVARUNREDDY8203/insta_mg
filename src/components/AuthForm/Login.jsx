import { Alert, AlertIcon, Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const { loading, error, login } = useLogin();
    const [isLogin, setIsLogin] = useState(true);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                onChange={(e) =>
                    setInputs({
                        ...inputs,
                        email: e.target.value,
                    })
                }
            ></Input>
            <Input
                placeholder='Password'
                fontSize={14}
                type='password'
                onChange={(e) =>
                    setInputs({
                        ...inputs,
                        password: e.target.value,
                    })
                }
            ></Input>
            {error && (
                <Alert status='error'>
                    <AlertIcon />
                    {error.message}
                </Alert>
            )}
            <Button
                colorScheme='blue'
                fontSize={14}
                width={"full"}
                size={"sm"}
                isLoading={loading}
                onClick={() => login(inputs)}
            >
                Log in
            </Button>
        </>
    );
};

export default Login;
