import {atom, selector} from 'recoil';

// 기본적으로 enum은 안의 값들을 숫자로 저장하기 때문에, string 등 원하는 타입으로 저장하려면 밑에처럼 = 표시로 값을 지정해주면 된다.
export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}
// atom의 아웃풋(state)을 변형시킴
export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  // get은 option이라는 객체값을 인자로 받는데, 그 중 get이라는 함수를 불러서 toDoState값을 바꿈
  get: ({get}) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    // if (category === 'TO_DO')
    //   return toDos.filter(toDo => toDo.category === 'TO_DO');
    // if (category === 'DOING')
    //   return toDos.filter(toDo => toDo.category === 'DOING');
    // if (category === 'DONE')
    //   return toDos.filter(toDo => toDo.category === 'DONE');
    return toDos.filter(toDo => toDo.category === category);
  },
});

export default toDoState;
