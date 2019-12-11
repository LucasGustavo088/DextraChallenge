package com.dextrachallenge.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dextrachallenge.model.Ingrediente;
import com.dextrachallenge.model.Produto;
import com.dextrachallenge.service.ProdutoService;
import com.dextrachallenge.utils.Json;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import ch.qos.logback.core.net.SyslogOutputStream;

@RestController
@RequestMapping(value = "/produto")
public class ProdutoController {
	
	private ProdutoService ls = new ProdutoService();
	private HashMap<Long, Produto> produtos;
	
	public ProdutoController() {
		produtos = ls.produtos;
	}
	
	@RequestMapping(value = "/cardapio", method = RequestMethod.GET)
	public String listar() {
		ArrayList listProdutos = new ArrayList<Produto>(produtos.values());
		
		return Json.paraJson(listProdutos);
	}
	
	@RequestMapping(value = "/cardapio/{id}", method = RequestMethod.GET)
	public String obterProduto(@PathVariable("id") Long id) {
		Produto produto = produtos.get(id);
		
		return Json.paraJson(produto);
	}
	
	@RequestMapping(value = "/cardapio_personalizado", method = RequestMethod.POST)
	public String obterProdutoPersonalizado(@RequestBody List<Ingrediente> ingredientes) {
		Produto produto = ls.obterProdutoCustomizado(ingredientes);
		
		return Json.paraJson(produto);
	}
	
	
}
