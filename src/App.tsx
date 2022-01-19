import React from 'react';
import './App.css';
import LoadingPage from "./components/LoadingPage";
import CityPage from "./components/CityPage";
import { AppStyle } from "./styles/StyledComponents";

export default function App() {
  return (
    <AppStyle>
        <CityPage/>
    </AppStyle>
  );
}
