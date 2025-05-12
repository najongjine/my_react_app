import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TodoList from "./pages/TodoList";
import CounterPage from "./pages/CounterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout 안에 공통 구조가 있고, 그 내부에서 페이지가 전환됨 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/todo_list" element={<TodoList />} />
          <Route path="/counterpage" element={<CounterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
