import React from "react";
import { useCounterStore } from "../store/counterStore";

const CounterPage: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  const increase = useCounterStore((state) => state.increase);
  const reset = useCounterStore((state) => state.reset);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔢 Zustand 전역 상태 테스트</h1>
      <p>현재 숫자: {count}</p>
      {/* 여기서 increase는 이미 정의된 함수예요.
즉, increase()는 인자가 필요 없는 함수이고, ()=> 없어도
그냥 increase만 써도 React가 "아~ 클릭되면 이거 실행하라는 거구나!"라고 이해할 수 있어요.
 */}
      <button onClick={increase}>+1 증가</button>
      <button onClick={reset} style={{ marginLeft: "1rem" }}>
        리셋
      </button>
    </div>
  );
};

export default CounterPage;
