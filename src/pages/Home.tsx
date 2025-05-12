import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <h2>여기는 본문 내용이 들어갈 부분이에요!</h2>
      <p>리액트와 타입스크립트를 배워보아요 🎉</p>
      <Link to="/todo_list">
        <button>Todo List 페이지로 이동</button>
      </Link>
    </>
  );
};

export default Home;
