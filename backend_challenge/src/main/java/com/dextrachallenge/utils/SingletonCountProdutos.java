package com.dextrachallenge.utils;

public class SingletonCountProdutos {
 
    private static SingletonCountProdutos uniqueInstance = new SingletonCountProdutos();
    public static int count = 0;
    
    private SingletonCountProdutos() {
    }
 
    public static SingletonCountProdutos getInstance() {
        return uniqueInstance;
    }
}