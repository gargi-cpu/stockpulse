package com.gargi.stockpulse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.StockService;
import dto.StockResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Configure this with your frontend URL in production
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/stocks")
    public ResponseEntity<StockResponse> getStocks() {
        try {
            StockResponse stocks = stockService.getStocks();
            return ResponseEntity.ok(stocks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("StockPulse Backend is running!");
    }
}
