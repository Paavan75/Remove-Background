package com.example.removebg.dto;

import jakarta.persistence.Column;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {

    private long id;

    private String clerkId;

    private String email;

    private String firstName;

    private String lastName;

    private String photoUrl;

    private Integer credits;
}
