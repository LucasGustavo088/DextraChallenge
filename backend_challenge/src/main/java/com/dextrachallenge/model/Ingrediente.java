package com.dextrachallenge.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Ingrediente {
	private int id;
	private String descricao;
	private String preco;
	private int quantidade;
	
	public Ingrediente(int id, String descricao, String preco, int quantidade) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.preco = preco;
		this.quantidade = quantidade;
	}

	
}
