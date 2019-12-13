package com.dextrachallenge.dextrachallenge;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.dextrachallenge.model.Ingrediente;
import com.dextrachallenge.model.Produto;
import com.dextrachallenge.service.ProdutoService;

import lombok.Getter;

/*
 * Classe utilizada para realizar testes unitários de produto
 * */

public class TesteProduto {
	
	ProdutoService ps;
	HashMap<Long, Produto> produtos;
	HashMap<Long, Ingrediente> ingredientes;
	
	@Before
	public void setUp() throws Exception {
		ps = new ProdutoService();
		produtos = ps.produtos;
		ingredientes = ps.ingredientes;
	}
	
	@Test
	public void criarProdutosPrecos() {
		
		/* Verificando preço do X-BACON */
		Produto xbacon = ps.produtos.get(1L);
		double precoTotal = ps.bacon.getPreco() + ps.hamburguerCarne.getPreco() + ps.queijo.getPreco();
		assertEquals(precoTotal, xbacon.precoTotal(), 0);
		
		/* Verificando preço do X-BURGUER */
		Produto xburguer = ps.produtos.get(2L);
		double precoTotalXBurguer = ps.hamburguerCarne.getPreco() + ps.queijo.getPreco();
		assertEquals(precoTotalXBurguer, xburguer.precoTotal(), 0);
		
		/* Verificando preço do X-EGG */
		Produto xegg = ps.produtos.get(3L);
		double precoXegg = ps.ovo.getPreco() + ps.hamburguerCarne.getPreco() + ps.queijo.getPreco();
		assertEquals(precoXegg, xegg.precoTotal(), 0);
		
		/* Verificando preço do X-EGG-BACON */
		Produto xeggbacon = ps.produtos.get(4L);
		double precoXeggbacon = ps.bacon.getPreco() + ps.ovo.getPreco() + ps.hamburguerCarne.getPreco() + ps.queijo.getPreco();
		assertEquals(precoXeggbacon, xeggbacon.precoTotal(), 0);
	}
	
	@Test
	public void produtoPersonalizado() {
		Ingrediente muitaCarneTeste1 = new Ingrediente(3, "Hamburguer de Carne", 3.00, 3, 1);
		List<Ingrediente> personalizadoIngredientes = new ArrayList<Ingrediente>();
		personalizadoIngredientes.add(ps.bacon);
		personalizadoIngredientes.add(muitaCarneTeste1);
		personalizadoIngredientes.add(ps.queijo);
		Produto produtoPersonalizado = new Produto(1, "Personalizado", personalizadoIngredientes, ps.calcularPrecoTotalProduto(personalizadoIngredientes), null);
		assertEquals(9.5, produtoPersonalizado.precoTotal(), 0);
	}
	
	@Test
	public void testarLight() {

		Produto teste1 = ps.produtos.get(5L);
		double precoTeste1 = (ps.alface.getPreco() + ps.hamburguerCarne.getPreco() + ps.queijo.getPreco()) 
				- ps.descontoLight * (ps.alface.getPreco() + ps.hamburguerCarne.getPreco() + ps.queijo.getPreco());
		assertEquals(precoTeste1, teste1.precoTotal(), 0);
	}
	
	@Test
	public void testarMuitaCarne() {
		Ingrediente muitaCarneTeste1 = new Ingrediente(3, "Hamburguer de Carne", 3.00, 3, 1);
		
		assertEquals(2, ps.obterRegraNovaQuantidade(muitaCarneTeste1.getQuantidade()));
		
		Ingrediente muitaCarneTeste2 = new Ingrediente(3, "Hamburguer de Carne", 3.00, 6, 1);
		assertEquals(4, ps.obterRegraNovaQuantidade(muitaCarneTeste2.getQuantidade()));
	}
	
	@Test
	public void testarMuitoQueijo() {
		Ingrediente muitoQueijo1 = new Ingrediente(5, "Queijo", 1.50, 3, 1);
		
		assertEquals(2, ps.obterRegraNovaQuantidade(muitoQueijo1.getQuantidade()));
		
		Ingrediente muitoQueijo2 = new Ingrediente(5, "Queijo", 1.50, 6, 1);
		assertEquals(4, ps.obterRegraNovaQuantidade(muitoQueijo2.getQuantidade()));
	}
}
