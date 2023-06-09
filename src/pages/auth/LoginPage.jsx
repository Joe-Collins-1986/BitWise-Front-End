import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import {
  useSetSuccessToast,
  useSetFailToast,
} from "../../contexts/AlertToasts";
import { setTokenTimestamp } from "../../utils/utils";

const LoginPage = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const [errors, setErrors] = useState({});
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("dj-rest-auth/login/", loginData)
      .then((response) => {
        setCurrentUser(response.data.user);
        setTokenTimestamp(response.data);
        navigate(-1);
        setSuccessToast("Welcome to BitWise. You are now logged in!");
      })
      .catch((err) => {
        // add console log to for dev testing if neccessary
        setErrors(err.response?.data);
        setFailToast(`Unable to login (status: ${err.response?.status})`);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign="center" px={10}>
            Login to your account
          </Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  aria-label="Username"
                />
              </FormControl>

              {errors.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="password">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  aria-label="Password"
                />
              </FormControl>

              {errors.password?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <Button
                type="submit"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Login
              </Button>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
