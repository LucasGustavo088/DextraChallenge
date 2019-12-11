package com.dextrachallenge.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Produto {
	private int id; 
	private String descricao;
	private List<Ingrediente> ingredientes;
	private String precoTotal;
	
	public Produto(int id, String descricao, List<Ingrediente> ingredientes, String precoTotal) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.ingredientes = ingredientes;
		this.precoTotal = precoTotal;
	}
	
	
}
