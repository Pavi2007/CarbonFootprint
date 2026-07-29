package com.carbonfootprint.carbonfootprint.repository;

import com.carbonfootprint.carbonfootprint.entity.SupportTicket;
import com.carbonfootprint.carbonfootprint.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportRepository extends JpaRepository<SupportTicket, Long> {

    List<SupportTicket> findByUser(User user);

}