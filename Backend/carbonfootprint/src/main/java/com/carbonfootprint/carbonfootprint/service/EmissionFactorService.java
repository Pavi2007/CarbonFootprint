package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorResponse;

import java.util.List;

public interface EmissionFactorService {

    List<EmissionFactorResponse> getAllFactors();

    EmissionFactorResponse getFactor(Long id);

    EmissionFactorResponse addFactor(EmissionFactorRequest request);

    EmissionFactorResponse updateFactor(Long id,
                                        EmissionFactorRequest request);

    void deleteFactor(Long id);
}