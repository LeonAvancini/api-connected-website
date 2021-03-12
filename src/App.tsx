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

const Title = styled.h1`
  color: black;
`;

const ImageTitle = styled.h1`
  color: black;
`;

const DatePickerStyled = styled(DatePicker)`
  border-radius: 10px;
  font-size: 25px;
`;

const Image = styled.img`
  border-radius: 5px;
`;

export default () => {
  const [test, setTest] = useState<any>({});
  const [startDate, setStartDate] = useState<Date | null | undefined>(
    new Date()
  );

  const dateFormatted = formatDate(startDate ?? new Date());

  //FIXME: API DATA WEBSITE === https://api.nasa.gov/index.html
  const API_KEY: string = "api_key=J9c8DvGBTzcqvhFd8UPQIJqhzJ80Ractk3JBOiRx";
  const baseUrl = "https://api.nasa.gov";

  const fetchData = async () => {
    const response = await fetch(
      `${baseUrl}/planetary/apod?date=${dateFormatted}&${API_KEY}`
    );
    const data = await response.json();
    setTest(data);
    console.log("datos", test);
  };

  useEffect(() => {
    fetchData();
  }, [dateFormatted]);

  return (
    <div>
      <Container>
        <Title onClick={() => fetchData()}>Api Connected Website</Title>{" "}
        <Title>{`Astronomy Picture of the ${dateFormatted}`}</Title>
        <DatePickerStyled
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
        />
        <ImageTitle>{test.title}</ImageTitle>
          <Image width="50%" height="50%" src={`${test.url}`} />
      </Container>
    </div>
  );
};
