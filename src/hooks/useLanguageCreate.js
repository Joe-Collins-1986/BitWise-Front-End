import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

import { useSetProfileData } from "../contexts/ProfilesDataContext";

const useLanguageCreate = (profile, setLanguages) => {
  const [languageData, setLanguageData] = useState({
    language: "",
    confidence: 20,
    used_since: "",
  });
  const { language, confidence, used_since } = languageData;

  const setProfile = useSetProfileData();

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [languageData]);

  const handleChange = (event) => {
    setLanguageData({
      ...languageData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("language", language);
    formData.append("confidence", confidence);
    // formData.append("used_since", used_since);

    try {
      const { data } = await axiosReq.post("/languages/", formData, {
        params: {
          profile: profile,
        },
      });

      setLanguages((prevLanguages) => ({
        ...prevLanguages,
        results: [data, ...prevLanguages.results],
      }));

      setProfile((prevProfile) => {
        const updatedPageProfile = {
          ...prevProfile.pageProfile.results[0],
          languages_count:
            prevProfile.pageProfile.results[0].languages_count + 1,
        };

        return {
          ...prevProfile,
          languages_count: prevProfile.languages_count + 1,
          pageProfile: {
            results: [updatedPageProfile],
          },
        };
      });
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    language,
    confidence,
    used_since,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLanguageCreate;
