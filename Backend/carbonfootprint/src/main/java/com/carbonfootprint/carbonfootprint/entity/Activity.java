package com.carbonfootprint.carbonfootprint.entity;

import com.carbonfootprint.carbonfootprint.enums.ActivityType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "activities")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private ActivityType activityType;

    private Double value;

    private String unit;

    private Double emission;

    private LocalDate activityDate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}