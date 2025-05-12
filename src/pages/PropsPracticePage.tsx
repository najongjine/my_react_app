// src/pages/PropsPracticePage.tsx
import React, { useState } from "react";
import StudentCard from "../components/props_practice_page/StudentCard";

// 👨‍🏫 부모 컴포넌트
const PropsPracticePage: React.FC = () => {
  // 🧠 학생 이름을 저장할 공간(상태)을 만들어요
  const [studentName, setStudentName] = useState("");

  // ✏️ 사용자가 input에 글자를 입력하면 실행되는 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력한 값을 상태에 저장해요
    setStudentName(e.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧪 Props 연습 페이지</h2>
      <p>학생의 이름을 입력해보세요:</p>

      {/* 사용자가 이름을 입력할 수 있는 입력창 */}
      <input
        type="text"
        placeholder="이름을 입력하세요"
        value={studentName} // 상태 값이 input에 반영돼요
        onChange={handleChange} // 글자가 바뀔 때마다 handleChange가 실행돼요
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />

      {/* StudentCard 컴포넌트에 이름을 전달해요 */}
      <StudentCard name={studentName} />
    </div>
  );
};

// 이 페이지를 다른 곳에서 쓸 수 있게 내보내요
export default PropsPracticePage;
