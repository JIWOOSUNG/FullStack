//함수형 컴포넌트에서 props를 받으려면 매개변수로 props를 사용하면 된다

const MyComp= ({mycolor = 'red', mybgcolor = 'yello',children = '죽어 '}) => { 
    let myStyle = {
        color: mycolor,
        backgroundColor: mybgcolor,
        padding: '5px',
        margin:'1em'
    }
    return (
        <div style={myStyle}>
            <h2>MyComp 함수형 자식 컴포넌트: {children}</h2>
        </div>
    )
}

export default MyComp;