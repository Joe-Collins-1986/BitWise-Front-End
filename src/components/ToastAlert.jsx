import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  useSuccessToast,
  useSetSuccessToast,
  useFailToast,
  useSetFailToast,
} from "../contexts/AlertToasts";

const ToastAlert = () => {
  const toast = useToast();
  const successToast = useSuccessToast();
  const setSuccessToast = useSetSuccessToast();
  const failToast = useFailToast();
  const setFailToast = useSetFailToast();

  useEffect(() => {
    if (successToast !== "") {
      toast({
        title: successToast,
        description: "Successful Update",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      setSuccessToast("");
    }
  }, [successToast]);

  useEffect(() => {
    if (failToast !== "") {
      toast({
        title: "Error",
        description: failToast,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setFailToast("");
    }
  }, [failToast]);

  return null;
};

export default ToastAlert;