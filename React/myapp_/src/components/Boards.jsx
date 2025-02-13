//Board.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
//useSearchParams => URL의 Query String 문자열을 읽고 수정하는데 사용
//boards?page=1&size=10&board_id=100
//?page=1&size=10&bid=100 ==>query string
export default function Boards() {
    const [params] = useSearchParams();
    console.log(params); //URLSearchParams객체를 반환
    console.log(params.size); //

    const search = [...params]; //사본 배열
    console.log(search);

    return (
        <div>
            <h1>useSearchParams 훅</h1>
            {search.map((param, i) => {
                return (
                    <h3>
                        {param[0]} : {param[1]}
                    </h3>
                );
            })}
            <hr></hr>
            <h2>bid: {params.get('bid')} </h2>
            <h2>page: {params.get('page')} </h2>
            <h2>size: {params.get('size')} </h2>
        </div>
    );
}
