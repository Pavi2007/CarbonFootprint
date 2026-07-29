package com.carbonfootprint.carbonfootprint.controller;


import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorResponse;
import com.carbonfootprint.carbonfootprint.service.EmissionFactorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/emission-factors")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class EmissionFactorController {

    private final EmissionFactorService emissionFactorService;

    @GetMapping
    public ResponseEntity<List<EmissionFactorResponse>> getAllFactors() {

        return ResponseEntity.ok(emissionFactorService.getAllFactors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmissionFactorResponse> getFactor(
            @PathVariable Long id) {

        return ResponseEntity.ok(emissionFactorService.getFactor(id));
    }

    @PostMapping
    public ResponseEntity<EmissionFactorResponse> addFactor(
            @RequestBody EmissionFactorRequest request) {

        return ResponseEntity.ok(emissionFactorService.addFactor(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmissionFactorResponse> updateFactor(
            @PathVariable Long id,
            @RequestBody EmissionFactorRequest request) {

        return ResponseEntity.ok(
                emissionFactorService.updateFactor(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFactor(
            @PathVariable Long id) {

        emissionFactorService.deleteFactor(id);

        return ResponseEntity.ok("Emission Factor Deleted Successfully");
    }
}