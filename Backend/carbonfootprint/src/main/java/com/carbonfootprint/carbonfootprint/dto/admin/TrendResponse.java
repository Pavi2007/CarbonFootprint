package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TrendResponse {

    private String time;

    private Double emission;

}