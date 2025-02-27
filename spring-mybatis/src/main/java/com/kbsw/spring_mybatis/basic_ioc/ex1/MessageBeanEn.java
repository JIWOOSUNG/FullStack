package com.kbsw.spring_mybatis.basic_ioc.ex1;

import lombok.Setter;

import java.util.Date;
import java.util.Random;

@Setter  //setGreeting(), setNum()...등등의 setXXX()메서드를 구성
public class MessageBeanEn implements MessageBean {

    //멤버변수 (property)
    private String greeting;//null <= default값
    private int num; //0

    private Date today;//null

    private Random random;//null

    @Override
    public void sayHello(String name){
        System.out.println("Hello "+name);
    }

    @Override
    public void sayHi(){
        System.out.println("Hi "+greeting);
        System.out.println(today);
        System.out.println("행운의 숫자: "+num);
        if(random== null) return;
        //랜덤한 정수 값 추출
        int randomNum=random.nextInt(66)+5;
        //5<= randomNum <=70 사이의 랜덤한 정수값을 발생시킴
        System.out.println("랜덤한 정수값: "+randomNum);
//        appContext.xml에서 java.util.Random객체를 빈으로 등록해서
        //MessageBeanEn객체에 injection하기
    }
}
