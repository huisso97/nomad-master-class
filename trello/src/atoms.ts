import {atom, selector} from 'recoil';

export const minuteState = atom({
  key: 'minutes',
  default: 0,
});

export const hourSelector = selector<number>({
  key: 'hours',
  get: ({get}) => {
    // get함수는 atom값을 가져오는 함수
    const minutes = get(minuteState);

    return minutes / 60;
  },
  // set함수는 state를 수정하는 함수
  set: ({set}, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
