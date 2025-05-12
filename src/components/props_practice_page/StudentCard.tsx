import React from "react";

// 🧒 자식 컴포넌트가 받을 값의 이름(name)과 그 타입(string)을 정해요
interface StudentCardProps {
  name: string; // name은 문자열(string)이어야 해요
}

// 👇 StudentCard라는 자식 컴포넌트를 만들어요
// (부모로부터 name이라는 값을 받아서 사용해요)
const StudentCard: React.FC<StudentCardProps> = ({ name }) => {
  return (
    <div style={{ border: "1px solid black", padding: "1rem", marginTop: "1rem" }}>
      <h3>📛 학생 카드</h3>
      {/* 받은 name 값을 화면에 보여줘요 */}
      <p>이름: {name}</p>
    </div>
  );
};

// 이 컴포넌트를 다른 파일에서도 쓸 수 있도록 내보내요
export default StudentCard;
