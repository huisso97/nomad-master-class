import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const toDoSate = atom<IToDo[]>({
  key: "toDO",
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: "DONE" | "TO_DO" | "DOING";
}

function ToDoList() {
  const [toDos, setTodos] = useRecoilState(toDoSate);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  // 입력값이 submit이 되고, 값이 검사를 통과하면 다시 input 비우고 싶다
  // const handleValid = (data:IForm)에서 toDo를 뺀거임
  const handleValid = ({ toDo }: IForm) => {
    setTodos((oldTodos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldTodos]);
    setValue("toDo", "");
  };
  console.log(toDos);
  return (
    <div>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register("toDo", {
            required: "plz write a to do",
          })}
          placeholder="Write a to do"
        />
        <span>{errors.toDo?.message}</span>
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
