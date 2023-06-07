import { useState, useEffect } from "react";
import { axiosRes } from "../api/axiosDefaults";

const useLanguageEdit = (
  id,
  language,
  confidence,
  used_since,
  setLanguages,
  setShowEditLanguage
) => {
  const [languageData, setLanguageData] = useState({
    languageConfidence: confidence,
    languageUsed_since: used_since || "",
  });

  const { languageConfidence, languageUsed_since } = languageData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "languageConfidence") {
      setLanguageData({
        ...languageData,
        languageConfidence: parseFloat(value),
      });
    } else {
      setLanguageData({
        ...languageData,
        [name]: value,
      });
    }
  };

  const calculateYearsOfExperience = () => {
    const currentDate = new Date();
    const usedSinceDate = new Date(languageUsed_since);
    const timeDiff = currentDate.getTime() - usedSinceDate.getTime();
    const yearsExp = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

    return yearsExp;
  };
  const yearsExp = calculateYearsOfExperience();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("language", language);
    formData.append("confidence", languageConfidence);
    formData.append("used_since", languageUsed_since);

    try {
      const { data } = await axiosRes.put("/languages/" + id, formData);

      setLanguages((prevLanguages) => ({
        ...prevLanguages,
        results: prevLanguages.results.map((language) => {
          return language.id === id
            ? {
                ...language,
                confidence: languageConfidence,
                used_since: languageUsed_since,
                years_exp: yearsExp,
              }
            : language;
        }),
      }));
      setShowEditLanguage(false);
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return {
    languageConfidence,
    languageUsed_since,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useLanguageEdit;
