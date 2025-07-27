package com.example.romannumeralservice;

import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class RomanNumeralConverter {

    private static final LinkedHashMap<Integer, String> MAP = new LinkedHashMap<>();
    static {
        MAP.put(1000, "M");
        MAP.put(900,  "CM");
        MAP.put(500,  "D");
        MAP.put(400,  "CD");
        MAP.put(100,  "C");
        MAP.put(90,   "XC");
        MAP.put(50,   "L");
        MAP.put(40,   "XL");
        MAP.put(10,   "X");
        MAP.put(9,    "IX");
        MAP.put(5,    "V");
        MAP.put(4,    "IV");
        MAP.put(1,    "I");
    }

    public String convert(int number) throws IllegalArgumentException {
        if (number < 1 || number > 3999) {
            throw new IllegalArgumentException(
                    "Input must be a whole number between 1 and 3999"
            );
        }
        StringBuilder result = new StringBuilder();
        for (Map.Entry<Integer, String> entry : MAP.entrySet()) {
            int value = entry.getKey();
            String roman = entry.getValue();
            while (number >= value) {
                result.append(roman);
                number -= value;
            }
        }
        return result.toString();
    }
}
