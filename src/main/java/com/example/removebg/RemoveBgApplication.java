package com.example.removebg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class RemoveBgApplication {

	public static void main(String[] args) {
		SpringApplication.run(RemoveBgApplication.class, args);
	}

}
