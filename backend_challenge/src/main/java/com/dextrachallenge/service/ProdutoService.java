package com.dextrachallenge.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.dextrachallenge.model.Ingrediente;
import com.dextrachallenge.model.Produto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProdutoService {
	
	@Getter public HashMap<Long, Produto> produtos = new HashMap<Long,Produto>();
	@Getter
	public HashMap<Long, Ingrediente> ingredientes = new HashMap<Long,Ingrediente>();
	
	public static Ingrediente alface;
	public static Ingrediente bacon;
	public static Ingrediente hamburguerCarne;
	public static Ingrediente ovo;
	public static Ingrediente queijo;
	
	public double descontoLight = 0.10;
	
	private int countId = 0;

	String foto = "https://abrilvejario.files.wordpress.com/2017/12/1-foto-2-notas-le-max_duro-de-matar.jpg?quality=70&strip=info";
	
	public ProdutoService() {
		criarEntidades();
	}
	
	/*
	 * Criam-se as entidades (produtos e ingredientes) para ficar na memória da aplicação. Podendo ser substituído por um banco, H2, etc futuramente.
	 * */
	public void criarEntidades() {
		
		/* ============== Instanciando os ingredientes ============== */
		alface = new Ingrediente(1, "Alface", 0.40, 1, 1);
		bacon = new Ingrediente(2, "Bacon", 2.00, 1, 1);
		hamburguerCarne = new Ingrediente(3, "Hamburguer de Carne", 3.00, 1, 1);
		ovo = new Ingrediente(4, "Ovo", 0.80, 1, 1);
		queijo = new Ingrediente(5, "Queijo", 1.50, 1, 1);
		
		ingredientes.put((long) 1, alface);
		ingredientes.put((long) 2, bacon);
		ingredientes.put((long) 3, hamburguerCarne);
		ingredientes.put((long) 4, ovo);
		ingredientes.put((long) 5, queijo);
		
		/* ============== Instanciando os lanches ============== */
		
		//X-BACON
		List<Ingrediente> xBaconIgredientes = new ArrayList<Ingrediente>();
		xBaconIgredientes.add(bacon);
		xBaconIgredientes.add(hamburguerCarne);
		xBaconIgredientes.add(queijo);
		Produto xBacon = new Produto(1, "X-Bacon", xBaconIgredientes, calcularPrecoTotalProduto(xBaconIgredientes), foto);
		
		// -- X-Burguer
	    List<Ingrediente> xBurguerIngredientes = new ArrayList<Ingrediente>();
	    xBurguerIngredientes.add(hamburguerCarne);
	    xBurguerIngredientes.add(queijo);
	    Produto xBurguer = new Produto(2, "X-Burguer", xBurguerIngredientes, calcularPrecoTotalProduto(xBurguerIngredientes), foto);

	    // -- X-Egg
	    List<Ingrediente> xEggIngredientes = new ArrayList<Ingrediente>();
	    xEggIngredientes.add(ovo);
	    xEggIngredientes.add(hamburguerCarne);
	    xEggIngredientes.add(queijo);
	    Produto xEgg = new Produto(3, "X-Egg", xEggIngredientes, calcularPrecoTotalProduto(xEggIngredientes), foto);

	    // -- X-Egg Bacon
	    List<Ingrediente> xEggBaconIngredientes = new ArrayList<Ingrediente>();
	    xEggBaconIngredientes.add(bacon);
	    xEggBaconIngredientes.add(ovo);
	    xEggBaconIngredientes.add(hamburguerCarne);
	    xEggBaconIngredientes.add(queijo);
	    Produto xEggBacon = new Produto(4, "X-Egg Bacon", xEggBaconIngredientes, calcularPrecoTotalProduto(xEggBaconIngredientes), foto);

	    // -- X-Salada
	    List<Ingrediente> xSaladaIngredientes = new ArrayList<Ingrediente>();
	    xSaladaIngredientes.add(alface);
	    xSaladaIngredientes.add(hamburguerCarne);
	    xSaladaIngredientes.add(queijo);
	    Produto xSalada = new Produto(5, "X-Salada", xSaladaIngredientes, calcularPrecoTotalProduto(xSaladaIngredientes), foto);
	    
		produtos.put((long) 1, xBacon);
		produtos.put((long) 2, xBurguer);
		produtos.put((long) 3, xEgg);
		produtos.put((long) 4, xEggBacon);
		produtos.put((long) 5, xSalada);
	}
	
	/*
	 * Cria-se um produto a partir dos ingredientes inseridos
	 * */
	public Produto obterProduto(List<Ingrediente> ingredientesSelecionados) {
		Produto produtoPersonalizado = new Produto();
		produtoPersonalizado.setId(++countId);
		produtoPersonalizado.setDescricao("Novo produto carrinho " + countId);
		produtoPersonalizado.ingredientes = ingredientesSelecionados;
		produtoPersonalizado.setPrecoTotal(calcularPrecoTotalProduto(ingredientesSelecionados));
		produtoPersonalizado.setImagem(foto);
		
		return produtoPersonalizado;
	}
	
	/*
	 * Calcular preço total do produto com base nos ingredientes inseridos. Também é calculado a promoção através das regras de negócio.
	 */
	public double calcularPrecoTotalProduto(List<Ingrediente> ingredientesCalculo) {
		boolean possuiAlface = false;
		boolean possuiBacon = false;
		boolean possuiPromocao = false;
		double preco = 0.00;
		double precoTotal = 0.00;

		for (Ingrediente ingrediente : ingredientesCalculo) {
			
			Ingrediente ingredienteSistema = null;
			for(Ingrediente ingredienteSistemaEach : this.ingredientes.values()) {
				if(ingrediente.getId() == ingredienteSistemaEach.getId()) {
					ingredienteSistema = ingredienteSistemaEach;
				}
			}
			
			// Caso tenha alface
			if(ingrediente.getId() == alface.getId()) {
				possuiAlface = true;
			}
			
			// Caso tenha bacon
			if(ingrediente.getId() == bacon.getId()) {
				possuiBacon = true;
			}
			
			// A cada 3 porções de carne o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
			// A cada 3 porções de queijo o cliente só paga 2. Se o lanche tiver 6 porções, o cliente pagará 4. Assim por diante...
			if(ingrediente.getId() == queijo.getId() || ingrediente.getId() == hamburguerCarne.getId()) {
				if(ingrediente.getQuantidade() >= 3) {
			
					possuiPromocao = true;
					
					int novaQuantidade = this.obterRegraNovaQuantidade(ingrediente.getQuantidade());
					
					ingrediente.setQuantidadeCalculo(novaQuantidade);
				} else {
					ingrediente.setQuantidadeCalculo(ingrediente.getQuantidade());
				}
			} else {
				ingrediente.setQuantidadeCalculo(ingrediente.getQuantidade());
			}
			
			//Calculo do preço total
			preco = ingredienteSistema.getPreco() * ingrediente.getQuantidadeCalculo();
			precoTotal += preco;
		}
		
		//Se o lanche tem alface e não tem bacon, ganha 10% de desconto.
		if((possuiAlface && !possuiBacon) && !possuiPromocao) {
			precoTotal = precoTotal - (precoTotal * this.descontoLight);
		}
		return precoTotal;
	}
	
	public int obterRegraNovaQuantidade(int quantidadeAtual) {
		int novaQuantidade = 0;
		for(int i = 1; i <= quantidadeAtual; i++) {
			novaQuantidade++;
			if(i % 3 == 0) {
				novaQuantidade--;
			}
		}
		
		return novaQuantidade;
	}
}
