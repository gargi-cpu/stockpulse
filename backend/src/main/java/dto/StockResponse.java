package dto;

import java.util.List;

public record StockResponse(
        int statusCode,
        List<StockData> data) {
}

record StockData(
        String symbol,
        String name,
        String marketCap,
        String currentPrice,
        String change,
        String percentChange) {
}