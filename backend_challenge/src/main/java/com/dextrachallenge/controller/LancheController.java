package com.dextrachallenge.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dextrachallenge.model.Ingrediente;
import com.dextrachallenge.model.Produto;
import com.dextrachallenge.service.LancheService;

import ch.qos.logback.core.net.SyslogOutputStream;

@RestController
@RequestMapping(value = "/lanche")
public class LancheController {
	
	private HashMap<Long, Produto> lanches;
	
	public LancheController() {
		
	}

	@RequestMapping(value = "/cardapio", method = RequestMethod.GET)
	public ResponseEntity listar() {
		
		LancheService ls = new LancheService();
		System.out.println("cardapio");
		
		return new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
	}
}
