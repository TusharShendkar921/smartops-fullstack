package com.smartops.backend.dto;

import com.smartops.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponse {

    private String token;
    private String name;
    private String email;
    private Role role;
}