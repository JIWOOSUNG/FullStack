package com.kbsw.basic.app;

import com.kbsw.basic.entity.MemberEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class MemberEntityTest {

    public static void main(String[] args) {
        //순수 JPA 테스트
        EntityManagerFactory factory= Persistence.createEntityManagerFactory("entitytest");
        //src/main/resources/META-INF/persistence.xml 파일에 기술된 persistence unit 이름을 넣너준다
        System.out.println("EntityManagerFactory객체: "+factory.getClass().getName());

        EntityManager em=factory.createEntityManager();
        System.out.println("EntityManager객체: "+em.getClass().getName());

        em.getTransaction().begin();
        System.out.println("****트랜잭션 시작*************");
        MemberEntity user=new MemberEntity(null,"김철수","kim@naver.com","123","noimage.jpg");
        em.persist(user); //C - insert 작업을 함
        em.getTransaction().commit();//Tx 종료
        System.out.println("****트랜잭션 종료************");
        em.close();
        factory.close();
    }
}
