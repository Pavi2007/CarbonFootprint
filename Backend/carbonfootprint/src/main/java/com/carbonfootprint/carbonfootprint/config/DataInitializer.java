package com.carbonfootprint.carbonfootprint.config;

import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.enums.Role;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (!userRepository.existsByEmail("admin@gmail.com")) {

            User admin = new User();

            admin.setName("Administrator");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);

            System.out.println("Admin Created Successfully");

        }

    }
}