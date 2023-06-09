import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from "@chakra-ui/react";
import useLinkCreate from "../hooks/useLinkCreate";
import { RiMailSendLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ArticleLinkCreate = (props) => {
  const { article, setLinks, setAddLink } = props;

  const {
    link_title,
    link_brief,
    link_url,
    errors,
    handleChange,
    handleSubmit,
  } = useLinkCreate(article, setLinks, setAddLink);

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack pb={3} w="100%">
          <Box
            borderRadius={5}
            p={5}
            border={"1px solid"}
            borderRight={"2px solid "}
            borderBottom={"2px solid"}
            borderColor="purple.300"
            w="100%"
          >
            <FormControl id="link_title">
              <FormLabel htmlFor="link_title">Link Title</FormLabel>

              <Input
                type="text"
                name="link_title"
                value={link_title}
                onChange={handleChange}
                aria-label="Link Title"
              />

              {errors.link_title && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.link_title[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl mt={5} id="link_brief">
              <FormLabel htmlFor="link_brief">
                Provide Info About Link
              </FormLabel>

              <Textarea
                rows={4}
                name="link_brief"
                value={link_brief}
                onChange={handleChange}
                aria-label="Link Brief"
              />

              {errors.link_brief && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.link_brief[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl mt={5} id="link_url">
              <FormLabel htmlFor="link_url">Link URL</FormLabel>

              <InputGroup>
                <InputLeftAddon children="https://" />
                <Input
                  placeholder="mysite"
                  type="text"
                  name="link_url"
                  value={link_url}
                  onChange={handleChange}
                  aria-label="Link URL"
                />
              </InputGroup>

              {errors.link_url && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.link_url[0]}
                </Alert>
              )}
            </FormControl>

            <Flex mt={2} justifyContent="end">
              <Button
                mr={1}
                onClick={() => setAddLink(false)}
                aria-label="Cancel"
              >
                <RxCross2 />
              </Button>
              <Button type="submit" aria-label="Submit">
                <RiMailSendLine />
              </Button>
            </Flex>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ArticleLinkCreate;
