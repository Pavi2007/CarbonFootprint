package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.EmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmissionFactorRepository
        extends JpaRepository<EmissionFactor, Long> {
}