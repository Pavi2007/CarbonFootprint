package com.carbonfootprint.carbonfootprint.entity;

import com.carbonfootprint.carbonfootprint.enums.GoalStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String goalName;

    private Double targetEmission;

    private Double targetReductionPercentage;

    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private GoalStatus status;

    private LocalDate createdAt;

    // NEW

    private LocalDate completedDate;

    private Double achievedEmission;

    private Double progressPercentage;

    private boolean notificationSent;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

}