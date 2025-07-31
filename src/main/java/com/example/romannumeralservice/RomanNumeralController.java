package com.example.romannumeralservice;

import io.micrometer.core.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class RomanNumeralController {
    private final RomanNumeralConverter converter;
    private final Logger logger = LoggerFactory.getLogger(getClass());

    public RomanNumeralController(RomanNumeralConverter converter) {
        this.converter = converter;
    }

    @Timed("roman.numeral.requests")
    @GetMapping("/romannumeral")
    public ResponseEntity<?> toRoman(
            @RequestParam("query") String queryStr,
            @RequestHeader(value = "X-Request-ID", required = false) String requestId
            ) {
        logger.debug("Received raw query={} for requestId={}", queryStr, requestId);
        try {
            int query = Integer.parseInt(queryStr);
            String roman = converter.convert(query);
            logger.info("Converted {} → {}", query, roman);
            return ResponseEntity.ok(new RomanNumeralResponse(queryStr, roman));
        } catch (IllegalArgumentException n) {
            String msg = "Query must be a whole number between 1 and 3999";
            logger.warn("Validation error for {}: {}", queryStr, n.getMessage());
            return ResponseEntity.badRequest().body(msg);
        }
    }
}