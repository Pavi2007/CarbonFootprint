package com.carbonfootprint.carbonfootprint.service;

import com.carbonfootprint.carbonfootprint.dto.ProfileResponse;
import com.carbonfootprint.carbonfootprint.dto.UpdateProfileRequest;
import com.carbonfootprint.carbonfootprint.entity.User;
import com.carbonfootprint.carbonfootprint.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private User getLoggedInUser(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        return userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();
    }

    public ProfileResponse getProfile(){

        User user = getLoggedInUser();

        return new ProfileResponse(

                user.getName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAge(),
                user.getGender()
        );

    }

    public ProfileResponse updateProfile(UpdateProfileRequest request){

        User user = getLoggedInUser();

        user.setName(request.getName());

        user.setPhoneNumber(request.getPhoneNumber());

        user.setAge(request.getAge());

        user.setGender(request.getGender());



        userRepository.save(user);

        return getProfile();
    }

}