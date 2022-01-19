import React from 'react';
import './App.css';
import LoadingPage from "./components/LoadingPage";
import { AppStyle } from "./styles/StyledComponents";

export default function App() {
  return (
    <AppStyle>
        <LoadingPage/>
    </AppStyle>
  );
}
