package com.carbonfootprint.carbonfootprint.controller;

import com.carbonfootprint.carbonfootprint.dto.ProfileResponse;
import com.carbonfootprint.carbonfootprint.dto.UpdateProfileRequest;
import com.carbonfootprint.carbonfootprint.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ProfileResponse getProfile(){

        return userService.getProfile();

    }

    @PutMapping("/profile")
    public ProfileResponse updateProfile(

            @RequestBody UpdateProfileRequest request){

        return userService.updateProfile(request);

    }

}