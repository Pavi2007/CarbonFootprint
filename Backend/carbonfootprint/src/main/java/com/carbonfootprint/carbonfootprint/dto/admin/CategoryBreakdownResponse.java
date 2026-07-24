package com.carbonfootprint.carbonfootprint.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryBreakdownResponse {

    private String category;

    private Double emission;

}