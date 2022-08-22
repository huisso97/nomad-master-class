import React from 'react';
import {useForm} from 'react-hook-form';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import toDoState, {categoryState} from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setTodos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IForm>();
  // 입력값이 submit이 되고, 값이 검사를 통과하면 다시 input 비우고 싶다
  // const handleValid = (data:IForm)에서 toDo를 뺀거임
  const handleValid = ({toDo}: IForm) => {
    setTodos(oldTodos => [{text: toDo, id: Date.now(), category}, ...oldTodos]);
    setValue('toDo', '');
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', {
          required: 'plz write a to do',
        })}
        placeholder="Write a to do"
      />
      <span>{errors.toDo?.message}</span>
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
