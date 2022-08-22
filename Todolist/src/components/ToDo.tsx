import React from 'react';
import {useSetRecoilState} from 'recoil';
import toDoState, {Categories, IToDo} from '../atoms';

function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  // const onClick = (newCategory: IToDo["category"]) => {
  //   console.log("i wanna to", newCategory);
  // };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: {name},
    } = e;
    // setToDos((oldToDos) => {
    //   const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
    //   const oldToDo = oldToDos[targetIndex];
    //   const newToDo = { text, id, category: name as IToDo["category"] };
    //   return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
    // });
    setToDos(prev => {
      const newTodos = prev.map(oldToDo => {
        if (oldToDo.id === id) {
          return {text, id, category: name as IToDo['category']};
        }
        return oldToDo;
      });
      return newTodos;
    });
  };

  return (
    <li>
      <span>{text}</span>
      {/* onClick에 인자를 넘겨주려면 익명함수 선언해서 호출해야함 */}
      {/* {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>ToDo</button>} */}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          ToDo
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
