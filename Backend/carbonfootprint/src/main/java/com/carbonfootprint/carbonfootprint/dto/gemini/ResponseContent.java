package com.carbonfootprint.carbonfootprint.dto.gemini;

import lombok.Data;

import java.util.List;

@Data
public class ResponseContent {

    private List<ResponsePart> parts;

}