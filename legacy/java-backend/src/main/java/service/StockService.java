package service;

import org.springframework.stereotype.Service;

import com.client.StockApiClient;

import dto.StockResponse;

@Service
public class StockService {
    private final StockApiClient stockApiClient;

    public StockService(StockApiClient stockApiClient) {
        this.stockApiClient = stockApiClient;
    }

    public StockResponse getStocks() {
        return stockApiClient.getStocks();
    }
}
