package com.kbsw.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@Entity
@Table(name="spring_user") //테이블명 (spring_user) 기술
@EntityListeners(AuditingEntityListener.class) // 날짜 자동 생성
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
    
    private String role; //회원 권한 (USER, ADMIN)

    @CreatedDate //생성 날짜를 자동으로 주입 (설정이 필요함 => @EntityListeners
                //@EnableJpaAuditing(SpringJpaApplication에서)
    private LocalDateTime indate; //회원 가입한 날짜

    @LastModifiedDate //마지막 수정날짜를 자동으로 주입
    @Column(name="updated_at")
    private LocalDateTime updatedAt;//회원정보 수정한 날짜

}
