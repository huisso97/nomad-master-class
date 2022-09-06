import React from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {hourSelector, minuteState} from './atoms';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  // 첫번째 argument는 get함수 반환값, 두번째 argument는 set함수
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    // string 개체앞에 +를 붙이면 number로 타입이 변함
    setMinutes(+event.currentTarget.value);
  };
  const onHoursChange = (event: React.FocusEvent<HTMLInputElement>) => {
    // hourSelector의 set함수 두번째 인자값 newValue값을 지정해줌
    setHours(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input
        onChange={onHoursChange}
        value={hours}
        type="number"
        placeholder="Hours"
      />
    </div>
  );
}

export default App;
