import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "./utils/Dates";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
`;

const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;
const MainTitle = styled.h1`
  color: white;
  align-items: center;
`;
const Copyright = styled.p`
  display: flex;
  color: white;
`;

const ImageTitle = styled.h2`
  color: lightblue;
`;

const DatePickerStyled = styled(DatePicker)`
  border-radius: 10px;
  font-size: 20px;
  text-align: center;
  padding: 5px 10px 5px 10px;
  box-sizing: content-box;
  width: 120px;
  margin-left: 10px;
  font-weight: bold;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Image = styled.img`
  border-radius: 5px;
`;

const ErrorMessage = styled.h3`
  border: 1px solid red;
  color: white;
  padding: 20px;
  border-radius: 5px;
`;

export default () => {
  const [dataGetted, setDataGetted] = useState<any>({});
  const [error, setError] = useState(false);
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    new Date()
  );

  const dateFormatted = formatDate(startDate ?? new Date());
  const API_KEY: string = "api_key=J9c8DvGBTzcqvhFd8UPQIJqhzJ80Ractk3JBOiRx";
  const baseUrl = "https://api.nasa.gov";

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/planetary/apod?date=${dateFormatted}&${API_KEY}`
      );
      const data = await response.json();
      setDataGetted(data);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateFormatted]);

  if (dataGetted.code === 400 || dataGetted.code === 404 || error) {
    return (
      <Container>
        <MainTitleContainer>
          <MainTitle>Astronomy Picture of the</MainTitle>
          <DatePickerStyled
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
        </MainTitleContainer>
        <ErrorMessage>
          {dataGetted.msg ?? "We have a error, please refresh page"}
        </ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <MainTitleContainer>
        <MainTitle>Astronomy Picture of the</MainTitle>
        <DatePickerStyled
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
      </MainTitleContainer>
      <ImageTitle>{dataGetted.title}</ImageTitle>
      <ImageContainer>
        {dataGetted.url !== undefined && dataGetted.url.includes("youtube") ? (
          <iframe width="420" height="315" src={dataGetted.url}></iframe>
        ) : (
          <Image
            title={dataGetted.explanation}
            width="50%"
            height="50%"
            src={`${dataGetted.url}`}
          />
        )}
        <Copyright>{dataGetted.copyright ?? "Anonymous"}</Copyright>
      </ImageContainer>
    </Container>
  );
};
