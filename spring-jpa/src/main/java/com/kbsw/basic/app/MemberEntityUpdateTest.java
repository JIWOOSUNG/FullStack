package com.kbsw.basic.app;

import com.kbsw.basic.entity.MemberEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.util.Scanner;

public class MemberEntityUpdateTest {

    public static void main(String[] args) {
        EntityManagerFactory factory = Persistence.createEntityManagerFactory("entitytest");
        EntityManager em=factory.createEntityManager();
        Scanner sc=new Scanner(System.in);
        System.out.println("수정할 회원번호(id) 입력: ");
        Long id=sc.nextLong();
        MemberEntity findUser=em.find(MemberEntity.class, id);
        System.out.println("-----------------");
        System.out.println(findUser);
        System.out.println("-----------------");

        em.getTransaction().begin();
        System.out.println("*".repeat(100)+"TX 시작****** ");

        if(findUser!=null){
            System.out.println("수정할 회원의 이메일 입력: ");
            sc.nextLine(); //엔터값 입력받음
            String newEmail=sc.nextLine();
            findUser.setEmail(newEmail); //엔티티 변경 ==> 변경감지

            System.out.println("수정할 프로필 이미지명 입력: ");
            //sc.nextLine();
            String newImg=sc.nextLine();
            System.out.println("newImg: "+newImg);
            findUser.setProfileImage(newImg);
        }
        System.out.println("엔터키 1 입력 (커밋 예정)");
        sc.nextLine();
        em.getTransaction().commit();//DB에 반영
        System.out.println("*".repeat(100)+"TX 종료****** ");
        em.close();
        factory.close();
        sc.close();
    }
}
