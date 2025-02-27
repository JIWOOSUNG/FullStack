package com.kbsw.spring_mybatis.basic_ioc.ex2;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class HelloSpringApp {

    public static void main(String[] args) {

        ApplicationContext ctx=new AnnotationConfigApplicationContext(AppConfig.class);
        Member m1=ctx.getBean("m1", Member.class);
        System.out.println(m1.toString());

        //userInfo 빈 룩업해서 출력
        Member m2=ctx.getBean("userInfo", Member.class);
        System.out.println(m2);//toString()이 자동 호출된다
        
        //ServiceImpl빈 찾아서 test1()호출하기
        Service svc=ctx.getBean("service",Service.class);
        svc.test1();//
    }
}
