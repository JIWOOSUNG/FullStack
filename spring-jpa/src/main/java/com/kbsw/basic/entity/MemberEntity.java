package com.kbsw.basic.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name="spring_member") //테이블명 기술
public class MemberEntity {

    @Id //PK에 붙인다
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="email", nullable = false)
    private String email;

    @Column(name="passwd", nullable = false)
    private String passwd;

    @Column(name="profile_image")
    private String profileImage;

}
