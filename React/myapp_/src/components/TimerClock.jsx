// TimerClock.jsx
import { FcAlarmClock } from 'react-icons/fc';
import { useState, useEffect } from 'react';
const TimerClock = () => {
    // Date객체 =>new Date() => 1초 단위로 새로 생성해서 설정
    const [time, setTime] = useState(new Date());
    //useEffect: 컴포넌트 렌더링되고 난후 호출/ state데이터 등이 수정이 일어나면 리렌더링되는데 그 때도 호출된다
    useEffect(() => {
        console.log('useEffect호출됨');
        //setInterval() 이용해서 1초 간격으로 Date객체 생성해서 state 값 변경
        const pid = setInterval(() => {
            //time=new Date(); [x]
            setTime(new Date());
            console.log('1초 간격으로 시간정보 얻어옴');
        }, 1000);

        //unmount될때 setInterval을 해제해야 함
        return () => {
            clearInterval(pid);
        };
    }, []);

    return (
        <div className="mt-4">
            <h1 className="text-primary">
                <FcAlarmClock /> {time.toLocaleTimeString()}
            </h1>
        </div>
    );
};
export default TimerClock;
