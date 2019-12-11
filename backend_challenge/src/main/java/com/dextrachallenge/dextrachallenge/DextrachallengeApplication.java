package com.dextrachallenge.dextrachallenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.dextrachallenge.controller"})
public class DextrachallengeApplication {

	public static void main(String[] args) {
		SpringApplication.run(DextrachallengeApplication.class, args);
	}

}
