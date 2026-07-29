package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorRequest;
import com.carbonfootprint.carbonfootprint.dto.admin.EmissionFactorResponse;
import com.carbonfootprint.carbonfootprint.entity.EmissionFactor;
import com.carbonfootprint.carbonfootprint.repository.EmissionFactorRepository;
import com.carbonfootprint.carbonfootprint.service.EmissionFactorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmissionFactorServiceImpl implements EmissionFactorService {

    private final EmissionFactorRepository emissionFactorRepository;

    @Override
    public List<EmissionFactorResponse> getAllFactors() {

        return emissionFactorRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmissionFactorResponse getFactor(Long id) {

        EmissionFactor factor = emissionFactorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emission Factor not found"));

        return mapToResponse(factor);
    }

    @Override
    public EmissionFactorResponse addFactor(EmissionFactorRequest request) {

        EmissionFactor factor = new EmissionFactor();

        factor.setActivityType(request.getActivityType());
        factor.setCategory(request.getCategory());
        factor.setFactor(request.getFactor());

        return mapToResponse(emissionFactorRepository.save(factor));
    }

    @Override
    public EmissionFactorResponse updateFactor(Long id,
                                               EmissionFactorRequest request) {

        EmissionFactor factor = emissionFactorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emission Factor not found"));

        factor.setActivityType(request.getActivityType());
        factor.setCategory(request.getCategory());
        factor.setFactor(request.getFactor());

        return mapToResponse(emissionFactorRepository.save(factor));
    }

    @Override
    public void deleteFactor(Long id) {

        emissionFactorRepository.deleteById(id);
    }

    private EmissionFactorResponse mapToResponse(EmissionFactor factor) {

        return new EmissionFactorResponse(
                factor.getId(),
                factor.getActivityType(),
                factor.getCategory(),
                factor.getFactor()
        );
    }
}