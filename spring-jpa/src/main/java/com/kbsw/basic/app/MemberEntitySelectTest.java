package com.kbsw.basic.app;

import com.kbsw.basic.entity.MemberEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class MemberEntitySelectTest {
    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        em.getTransaction().begin();
        System.out.println("*".repeat(100)+"TX 시작****** ");
//        조회 [1] em.find()
//            [2] JPQL을 이용한 조회 ==> createQuery(JPQL)
        MemberEntity findUser=em.find(MemberEntity.class,2L);
        System.out.println(findUser.getId()+"/"+findUser.getName()+"/"+findUser.getEmail());

        System.out.println("***모든 회원정보 조회 ******************");
        //JPQL(Java Persistence Query Language)
        TypedQuery<MemberEntity> query
                =em.createQuery("select m from MemberEntity m", MemberEntity.class);

        List<MemberEntity> list=query.getResultList();
        for(MemberEntity user:list){
            System.out.println(user);//user.toString()자동 호출
        }
        System.out.println("----------------------------");
        list.stream().forEach(m-> System.out.println(m.getName()+"\t"+m.getEmail()));


        System.out.println("*".repeat(100)+"TX 종료****** ");
        em.getTransaction().commit();
        em.close();
        factory.close();
    }
}
