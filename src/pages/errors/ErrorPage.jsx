import React from "react";
import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import errorImage from "../../../images/404-image.png";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Card
      direction={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="outline"
      m={{ base: "20px", md: "50px" }}
      aria-label="Error Card"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", md: "50%" }}
        maxH={{ base: "100%", md: "100%" }}
        src={errorImage}
        alt="404 image"
        aria-label="Error Image"
      />

      <Stack>
        <CardBody>
          <Heading size="md" aria-label="Page Not Found Heading">
            Page Not Found
          </Heading>

          <Text py="2" aria-label="Error Message">
            Looks like the page you're seeking decided to step away for a quick
            coffee break. It's probably enjoying a delightful cup of Java while
            we frantically search for it. We'll bring it back from the coffee
            shop soon. In the meantime, take a moment to refresh yourself too!
          </Text>
        </CardBody>

        <CardFooter>
          <Link to="/" aria-label="Back to Home Link">
            <Button variant="solid" colorScheme="purple">
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default ErrorPage;
