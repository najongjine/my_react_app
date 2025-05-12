// src/components/Header.tsx
import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>🌟 나의 멋진 리액트 앱</h1>
      <nav>
        <a href="/">홈</a>
        <a href="/counterpage">counterpage(공용 state, 화면 렌더링)</a>
        <a href="/todo_list">Todo List(서버연동X)</a>
      </nav>
    </header>
  );
};

export default Header;
