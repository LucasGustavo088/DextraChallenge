package com.dextrachallenge.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Ingrediente implements java.io.Serializable, Cloneable{
	private int id;
	private String descricao;
	private double preco;
	private int quantidade;
	
	public Ingrediente(int id, String descricao, double preco, int quantidade) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.preco = preco;
		this.quantidade = quantidade;
	}

	public Ingrediente() {
		super();
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

	public double getPreco() {
		return preco;
	}

	public void setPreco(double preco) {
		this.preco = preco;
	}

	public int getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(int quantidade) {
		this.quantidade = quantidade;
	}

	@Override
	public String toString() {
		return "Ingrediente [id=" + id + ", descricao=" + descricao + ", preco=" + preco + ", quantidade=" + quantidade
				+ "]";
	}
	
}
