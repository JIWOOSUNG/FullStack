package com.kbsw.basic.app;

import com.kbsw.basic.entity.MemberEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.Scanner;

public class MemberEntityInsertTest {

    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        em.getTransaction().begin();
        System.out.println("*".repeat(100)+"TX 시작****** ");
        MemberEntity user=null;
        for(int i=0;i<5;i++){
            user=new MemberEntity(null,"최민정"+(i+1),"choi"+i+".gmail.com","111","noimage.jpg");
            em.persist(user); //데이터 저장
        }

        System.out.println("엔터키를 입력하세요 ....");
        Scanner sc=new Scanner(System.in);
        sc.nextLine();
        sc.close();

        em.getTransaction().commit();
        System.out.println("*".repeat(100)+"TX 종료****** ");
        em.close();
        factory.close();
    }
}
