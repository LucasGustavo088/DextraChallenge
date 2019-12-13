package com.dextrachallenge.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Produto {
	private int id; 
	private String descricao;
	public List<Ingrediente> ingredientes;
	private double precoTotal;
	private String foto;
	
	public Produto(int id, String descricao, List<Ingrediente> ingredientes, double precoTotal, String foto) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.ingredientes = ingredientes;
		this.precoTotal = precoTotal;
		this.foto = foto;
	}
	

	public String getImagem() {
		return foto;
	}



	public void setImagem(String imagem) {
		this.foto = imagem;
	}



	public Produto() {
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<Ingrediente> getIngredientes() {
		return ingredientes;
	}

	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}

	public double getPrecoTotal() {
		return precoTotal;
	}

	public void setPrecoTotal(double precoTotal) {
		this.precoTotal = precoTotal;
	}
	
}
