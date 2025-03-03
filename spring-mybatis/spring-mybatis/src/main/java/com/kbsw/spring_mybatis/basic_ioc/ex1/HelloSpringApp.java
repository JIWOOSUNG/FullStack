package com.kbsw.spring_mybatis.basic_ioc.ex1;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

public class HelloSpringApp {

    public static void main(String[] args) {
        //MessageBean mb=new MessageBeanKo();
        //mb.sayHello("홍길동");
        //Ctrl+Shift+F : 최초 실행시
        //Shift+F10 : 재실행시
        //==> 개발자가 직접 객체를 관리하는 경우
        //스프링에서는 객체관리를 스프링 컨테이너가 한다
        //[1] xml로 관리하는 경우
        //[2] Java 클래스로 관리하는 경우

        //스프링 컨테이너가 관리하는 객체를 이름으로 lookup해서 사용해보자
        String resource="src/main/java/com/kbsw/spring_mybatis/basic_ioc/ex1/appContext.xml"; //설정파일 경로
        //스프링 컨테이너===>IOC (제어의 역전, 역제어)
        ApplicationContext ctx=new FileSystemXmlApplicationContext(resource);
        MessageBean mb=ctx.getBean("mb1", MessageBean.class);//DL (Dependecy Lookup)
        mb.sayHello("Tom");
        mb.sayHi();
        System.out.println("***************************");
        MessageBean mb3=ctx.getBean("mb3", MessageBean.class);
        mb3.sayHello("지수");
        mb3.sayHi();
    }
}
