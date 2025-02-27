package com.kbsw.spring_mybatis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
		//(exclude = DataSourceAutoConfiguration.class)
@ComponentScan(basePackages = {"com.kbsw.posts","com.kbsw.spring_mybatis","com.kbsw"  })
public class SpringMybatisApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringMybatisApplication.class, args);
	}

	//src/main/webapp/WEB-INF/views
}
