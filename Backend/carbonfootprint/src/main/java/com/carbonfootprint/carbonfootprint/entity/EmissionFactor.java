package com.carbonfootprint.carbonfootprint.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "emission_factors")
@Data
public class EmissionFactor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String activityType;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double factor;
}