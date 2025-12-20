package com.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import dto.StockResponse;

@Component
public class StockApiClient {
    private final RestTemplate restTemplate;
    private final String baseUrl;

    public StockApiClient(RestTemplate restTemplate,
            @Value("${stock.api.base-url}") @NonNull String baseUrl) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    public StockResponse getStocks() {
        return restTemplate.getForObject(baseUrl, StockResponse.class);
    }

}
