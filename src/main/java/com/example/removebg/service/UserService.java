package com.example.removebg.service;

import com.example.removebg.dto.UserDto;

public interface UserService {
    UserDto saveUser(UserDto userDto);

    UserDto getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);
}
