import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 각 페이지 내용이 여기 들어옴 */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
