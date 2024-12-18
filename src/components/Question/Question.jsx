import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";
const Question = () => {
  const { t } = useTranslation();
  const [clickedQuestions, setClickedQuestions] = useState([0]);
  const handleClicked = (index) => {
    if (clickedQuestions.includes(index)) {
      setClickedQuestions(clickedQuestions.filter((item) => item !== index));
    } else {
      setClickedQuestions([...clickedQuestions, index]);
    }
  };
  const qst = [
    {
      qst: "qst1",
      reponse: "rep1",
    },
    {
      qst: "qst2",
      reponse: "rep2",
    },
    {
      qst: "qst3",
      reponse: "rep3",
    },
    {
      qst: "qst4",
      reponse: "rep5",
    },
    {
      qst: "qst5",
      reponse: "qst5",
    },
  ];
  return (
    <div className="left" >
      <h1>{t("qst-title")}</h1>
      <p>{t("qst-desc")}</p>
      <div className="question-content">
        {qst.map((item, index) => (
          <div className="question" key={index}>
            <span onClick={() => handleClicked(index)}>
              <p>{t(item.qst)}</p>
              <IoIosArrowForward
                className={
                  clickedQuestions.includes(index)
                    ? "active-arrow arrow"
                    : " arrow"
                }
              />
            </span>
            <div
              className={
                clickedQuestions.includes(index) ? "active-rep rep" : " rep"
              }
            >
              <p>{t(item.reponse)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
