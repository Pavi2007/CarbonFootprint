package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.Activity;
import com.carbonfootprint.carbonfootprint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUser(User user);
    List<Activity> findByUserOrderByActivityDateDesc(User user);
}