// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// import {
//     Alert,
//     AlertIcon,
//     Button,
//     Input,
//     InputGroup,
//     InputRightElement,
// } from "@chakra-ui/react";
// import React, { useState } from "react";
// import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

// const SignUp = () => {
//     const [showPassword, setShowPassword] = useState(false);

//     const [inputs, setInputs] = useState({
//         fullname: "",
//         email: "",
//         password: "",
//         username: "",
//     });
//     const { loading, error, signup } = useSignUpWithEmailAndPassword();
//     return (
//         <>
//             <Input
//                 placeholder='Email'
//                 fontSize={14}
//                 type='email'
//                 value={inputs.email}
//                 onChange={(e) =>
//                     setInputs({
//                         ...inputs,
//                         email: e.target.value,
//                     })
//                 }
//             ></Input>

//             {/* <Input
//                 placeholder='Full name'
//                 fontSize={14}
//                 type='text'
//                 onChange={(e) =>
//                     setInputs({
//                         ...inputs,
//                         fullname: e.target.value,
//                     })
//                 }
//             ></Input>
//             <Input
//                 placeholder='Username'
//                 fontSize={14}
//                 type='text'
//                 onChange={(e) =>
//                     setInputs({
//                         ...inputs,
//                         username: e.target.value,
//                     })
//                 }
//             ></Input> */}
//             <InputGroup>
//                 <Input
//                     placeholder='Password'
//                     fontSize={14}
//                     type={showPassword ? "text" : "password"}
//                     onChange={(e) =>
//                         setInputs({
//                             ...inputs,
//                             password: e.target.value,
//                         })
//                     }
//                 ></Input>
//                 <InputRightElement>
//                     <Button
//                         variant={"ghost"}
//                         size={"sm"}
//                         onClick={() => setShowPassword(!showPassword)}
//                     >
//                         {showPassword ? (
//                             <ViewIcon></ViewIcon>
//                         ) : (
//                             <ViewOffIcon></ViewOffIcon>
//                         )}
//                     </Button>
//                 </InputRightElement>
//             </InputGroup>
//             {error && (
//                 <Alert status='error'>
//                     <AlertIcon />
//                     {error.message}
//                 </Alert>
//             )}
//             <Button
//                 colorScheme='blue'
//                 fontSize={14}
//                 width={"full"}
//                 size={"sm"}
//                 isLoading={loading}
//                 onClick={() => signup(inputs)}
//             >
//                 Sign Up
//             </Button>
//         </>
//     );
// };

// export default SignUp;

import {
    Alert,
    AlertIcon,
    Button,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({ email: "", password: "" });
    const { loading, error, signup } = useSignUpWithEmailAndPassword();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        await signup(inputs.email, inputs.password);
        navigate("/set-username");
    };

    return (
        <>
            <Input
                placeholder='Email'
                fontSize={14}
                type='email'
                value={inputs.email}
                onChange={(e) =>
                    setInputs({ ...inputs, email: e.target.value })
                }
            />
            <InputGroup>
                <Input
                    placeholder='Password'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    onChange={(e) =>
                        setInputs({ ...inputs, password: e.target.value })
                    }
                />
                <InputRightElement>
                    <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
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
                onClick={handleSignUp}
            >
                Sign Up
            </Button>
        </>
    );
};

export default SignUp;
