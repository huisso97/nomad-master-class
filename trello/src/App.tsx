import React from 'react';
import {useRecoilState} from 'recoil';
import {minuteState} from './atoms';

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    // string 개체앞에 +를 붙이면 number로 타입이 변함
    setMinutes(+event.currentTarget.value);
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinutesChange}
        type="number"
        placeholder="Minutes"
      />
      <input type="number" placeholder="Hours" />
    </div>
  );
}

export default App;
