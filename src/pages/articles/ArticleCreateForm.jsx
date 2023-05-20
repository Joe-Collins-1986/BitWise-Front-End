import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Show,
  Textarea,
  HStack,
  Select,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import languageOptions from "../../constants/languageOptions";

const ArticleCreateForm = () => {
  const [errors, setErrors] = useState({});

  const [articleData, setArticleData] = useState({
    title: "",
    content: "",
    language: "",
    github_link: "",
  });

  const { title, content, language, github_link } = articleData;

  const navigate = useNavigate();

  const handleChange = (event) => {
    setArticleData({
      ...articleData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("article_title", title);
    formData.append("article_content", content);
    formData.append("primary_language", language);
    formData.append("github_link", github_link);

    try {
      const { data } = await axiosReq.post("/articles/", formData);
      navigate(`/article/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 404) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Stack minH={"calc(100vh - 100px)"} direction={"row"}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Post an Article</Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  bg={"blackAlpha.50"}
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </FormControl>

              {errors.article_title?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="content">
                <FormLabel>Content</FormLabel>
                <Textarea
                  bg={"blackAlpha.50"}
                  rows={10}
                  type="text-area"
                  name="content"
                  value={content}
                  onChange={handleChange}
                />
              </FormControl>

              {errors.article_content?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="language">
                <FormLabel>Language</FormLabel>
                <Select
                  bg={"blackAlpha.50"}
                  placeholder="Select option"
                  name="language"
                  onChange={handleChange}
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {errors.primary_language?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="github_link">
                <FormLabel>GitHub Link</FormLabel>
                <Input
                  bg={"blackAlpha.50"}
                  type="text"
                  name="github_link"
                  value={github_link}
                  onChange={handleChange}
                />
              </FormControl>

              {errors.github_link?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <HStack pt={5} justifyContent="space-around">
                <Button
                  type="submit"
                  w="40%"
                  colorScheme={"purple"}
                  variant={"solid"}
                >
                  Submit Article
                </Button>

                <Button
                  w="40%"
                  colorScheme={"red"}
                  variant={"solid"}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </HStack>
            </Stack>
          </form>
        </Stack>
      </Flex>

      <Show above="lg">
        <Flex px="20px" py="20px" maxHeight="calc(100vh)" flex={1}>
          <Image
            borderRadius={"20"}
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
            }
          />
        </Flex>
      </Show>
    </Stack>
  );
};

export default ArticleCreateForm;