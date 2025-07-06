package com.example.removebg.controller;

import com.example.removebg.dto.UserDto;
import com.example.removebg.response.RemoveBgResponse;
import com.example.removebg.service.RemoveBackgroundService;
import com.example.removebg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final RemoveBackgroundService removeBackgroundService;

    private final UserService userService;

    @PostMapping("/remove-background")
    public ResponseEntity<?> removeBackground(@RequestParam("file") MultipartFile file, Authentication authentication) {
        RemoveBgResponse removeBgResponse = null;
        Map<String, Object> responseMap = new HashMap<>();
        try {
            if (authentication.getName().isEmpty() || authentication.getName() == null) {
                removeBgResponse = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .success(false)
                        .data("User does not have permission/access this resource")
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(removeBgResponse);
            }
            UserDto userDto = userService.getUserByClerkId(authentication.getName());
            if (userDto.getCredits() == 0) {
                responseMap.put("message", "No credit balance");
                responseMap.put("creditBalance", userDto.getCredits());
                removeBgResponse = RemoveBgResponse.builder()
                        .success(false)
                        .data(responseMap)
                        .statusCode(HttpStatus.OK)
                        .build();
                return ResponseEntity.ok(removeBgResponse);
            }
            byte[] imageByteArray = removeBackgroundService.removeBackground(file);
            String encodeToString = Base64.getEncoder().encodeToString(imageByteArray);
            userDto.setCredits(userDto.getCredits() - 1);

            userService.saveUser(userDto);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(encodeToString);
        } catch (Exception e) {
            removeBgResponse = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .success(false)
                    .data("Something went wrong")
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(removeBgResponse);
        }
    }
}
