package com.dextrachallenge.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

public class Json {
	
	public static String paraJson(Object object) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String gsonRetorno = gson.toJson(object);

		return gsonRetorno;
	}
}
