package com.kbsw.spring_mybatis.basic_ioc.ex2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration //AppConfig 클래스를 설정으로 사용하겠단 의미
public class AppConfig {

    @Bean(name="m1") //<bean id="m1" class="...Member"/>
    public Member memberInfo(){
        Member user = new Member();
        return user;
    }

    @Bean //Bean의 name을 기술하지 않으면 메서드명이 빈의 이름이 된다
    @Scope(value = "prototype")//디폴트값은 singleton ==> 단일 객체로 생성해서 관리, prototype으로 설정하면 매번 새로운 객체 생성
    public Member userInfo(){ //<bean id="userInfo" class="...Member"/>
        Member user=new Member();
        user.setName("김철수");
        user.setTel("010-7777-8888");
        return user;
    }

    @Bean
    public ServiceImpl service(){
        return new ServiceImpl();
    }
}
