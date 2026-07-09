package com.carbonfootprint.carbonfootprint.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrendResponse {

    private String time;
    private Double emission;

}