/**
React: 우리가 화면을 만들 수 있게 도와주는 도구 (리액트).
useState: 변하는 값을 저장하고 관리하는 도구 (상태 기억 장치).
"./TodoList.css": 디자인(모양새) 파일 불러오기.
 */
import React, { useState } from "react";
import "./TodoList.css";

// 하나의 할 일을 어떻게 생겼는지 설명하는 규칙 (타입)
interface Todo {
  // 컴퓨터 입장에서 각 할 일을 구별하기 위한 번호 (예: 123456789).
  id: number;
  // 사용자가 입력한 할 일 텍스트.
  text: string;
  // 컴퓨터 입장에서 지금 수정 중인지 아닌지를 알려주는 스위치 (true/false).
  isEditing: boolean;
}

/**
state를 “변하는 기억” 이라고 설명하면 이해 쉬움
화면에 보이는 건 항상 state와 연결되어 있음 (입력창, 목록 등)
JSX는 HTML처럼 보이지만, 실제로는 자바스크립트 코드임을 강조
 */
const TodoList: React.FC = () => {
  /**
   * todos	지금까지 추가된 할 일들의 목록 (배열)
   * setTodos	할 일 목록을 바꿔주는 버튼 같은 함수
   * useState	기억 장치 (변하는 값 저장소)
   */
  const [todos, setTodos] = useState<Todo[]>([]);
  /**
   * input	사용자가 입력하는 한 줄짜리 글
   * setInput	입력된 텍스트를 기억시켜줌
   * useState	기억 장치 (변하는 값 저장소)
   */
  const [input, setInput] = useState("");

  // 할 일 추가 함수
  const addTodo = () => {
    // 입력된 글자가 비어있으면 무시해요.
    if (!input?.trim()) return;
    //새로운 할 일(newTodo)을 하나 만들어요.
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      isEditing: false,
    };
    // 기존 목록(todos) 뒤에 붙여서 저장해요.
    setTodos([...todos, newTodo]);
    //입력창을 비워줘요.
    setInput("");
  };

  // 삭제하기
  const deleteTodo = (id: number) => {
    // todos.filter(...)는 목록 중에서 id가 일치하지 않는 것만 남겨요.
    // 즉, 해당 id를 가진 할 일을 제거하는 코드예요.
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 수정 시작
  const startEdit = (id: number) => {
    // map(...)은 배열을 하나하나 살펴보면서 바꾸는 함수예요.
    // todo.id === id인 경우만 isEditing: true로 바꿔요. 나머지는 그대로.
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isEditing: true } : todo)));
  };

  // 수정 저장
  const saveEdit = (id: number, newText: string) => {
    // 수정 중이던 글을 새 텍스트로 바꾸고, 다시 isEditing: false로 돌려놓아요.
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText, isEditing: false } : todo)));
  };

  // 화면에 보여지는 부분
  return (
    <div className="todo-container">
      <h2>
        📝 <b>나만의 Todo List</b>
      </h2>
      <div className="input-area">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          value={input} // html 의 input 과 내가 선언한 react 변수랑 맵핑
          onChange={(e) => setInput(e.target.value)} // html input의 값이 바뀌면 react input에 바로 반영.
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul className="todo-list">
        {/* todos.map(...)으로 모든 할 일을 하나씩 화면에 보여줌 */}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {/* todo.isEditing이 true면 → input 입력창 보여줌 (수정 중이라는 뜻) // false면 → 텍스트와 버튼(수정, 삭제) 보여줌 */}
            {todo.isEditing ? (
              <>
                <input
                  defaultValue={todo.text} // todo.text 의 값을 처음 한번만 넣어줌
                  // e는 **이벤트 객체(event object)**예요. 예를 들어 클릭, 입력, 포커스 등 이벤트가 생기면 그 이벤트에 대한 정보를 담은 객체가 자동으로 만들어져서 함수의 첫 번째 인자로 전달돼요.
                  // e.target은 이벤트가 발생한 대상 HTML 요소를 말해요. 이 코드에선 input 태그에서 blur(포커스 잃음) 이벤트가 발생했기 때문에 e.target은 그 input 태그 자기 자신이에요.
                  // e.target.value - input 태그에는 value라는 속성이 있어요. 사용자가 입력한 글자값이 바로 value에 담겨 있어요.
                  onBlur={(e) => saveEdit(todo.id, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveEdit(todo.id, (e.target as HTMLInputElement).value); // typescript 의 타입 사기치기. GPT 가 만들어준 코드
                    }
                  }}
                />
                <button onClick={() => startEdit(todo.id)}>수정</button>
              </>
            ) : (
              <>
                <span className="todo-text">{todo.text}</span>
                {/*
                "버튼이 클릭됐을 때 그 순간 startEdit(todo.id)를 실행해!" onClick={startEdit(todo.id)} 는 버튼이 렌더링(화면에 나타날 때)
                바로 실행돼버려요. 클릭 안 했는데도 실행돼요!
                */}
                <button onClick={() => startEdit(todo.id)}>수정</button>
                <button onClick={() => deleteTodo(todo.id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

/**
 * | 코드               | 의미                          |
| ---------------- | --------------------------- |
| `e`              | 이벤트 정보 전체                   |
| `e.target`       | 실제로 이벤트가 발생한 태그 (`<input>`) |
| `e.target.value` | 사용자가 입력창에 적은 글자 내용          |



onChange={(e) => setInput(e.target.value)}
이건 왜 하는거야? input value={input} 에서 이미 맵핑 했잔아?

| 개념              | 꼭 필요한 이유                     |
| --------------- | ---------------------------- |
| `value={input}` | React가 입력값을 "통제"하기 위함        |
| `onChange=...`  | 입력된 값을 React에게 "업데이트" 해주기 위함 |

겉보기엔 value={input}에서 이미 맵핑했으니까 onChange가 없어도 될 것 같죠?
그런데 React에서는 반드시 같이 써야 해요.

React는 이걸 이렇게 생각해요:

"입력창의 값은 내가(state)가 관리할게.
근데 사용자가 뭘 썼는지 알려줘야 내가 기억하지."

그러니까 React에게 ‘지금 사용자 입력이 뭐야?’라고 직접 전달해야
입력값이 화면에 반영돼요.

❌ 만약 onChange가 없으면?
<input value={input} />

이렇게만 있으면 사용자가 키보드로 뭘 입력해도
입력창은 절대로 바뀌지 않아요.

왜냐면:

React는 "내가 input 변수로 값을 정해줄 거야"라고 생각하는데

입력값이 바뀌었는지 모르니까 그대로 예전 값만 보여주는 거죠

그래서 둘은 세트예요
<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>
 */
