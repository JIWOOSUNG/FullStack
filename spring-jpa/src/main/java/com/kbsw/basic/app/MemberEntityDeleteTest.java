package com.kbsw.basic.app;

import com.kbsw.basic.entity.MemberEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;

import java.util.Scanner;

public class MemberEntityDeleteTest {
    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        TypedQuery<MemberEntity> query=em.createQuery("select m from MemberEntity m", MemberEntity.class);
        query.getResultList().stream().forEach(System.out::println);

        Scanner sc=new Scanner(System.in);
        System.out.println("엔터키1 ...");
        sc.nextLine();
        System.out.println(">>엔티티 삭제 예정>>>");

        em.getTransaction().begin();
        System.out.println("*".repeat(100)+"TX 시작****** ");
        MemberEntity findUser=em.find(MemberEntity.class, 2L);
        if(findUser!=null){
            //삭제 - em.remove(entity)
            em.remove(findUser);
            System.out.println("remove()호출됨...");
        }

        System.out.println("엔터키2 ...");
        sc.nextLine();

        TypedQuery<MemberEntity> query2=em.createQuery("select m from MemberEntity m", MemberEntity.class);
        query2.getResultList().stream().forEach(System.out::println);

        System.out.println("엔터키3 ...(커밋 예정)");
        sc.nextLine();
        em.getTransaction().commit();//실제 DB에 삭제 반영

        System.out.println("*".repeat(100)+"TX 종료****** ");

        query2=em.createQuery("select m from MemberEntity m", MemberEntity.class);
        query2.getResultList().stream().forEach(System.out::println);

        em.close();
        factory.close();
        sc.close();
    }
}
