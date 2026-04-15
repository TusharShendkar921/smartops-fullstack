package com.smartops.backend.dto;

import com.smartops.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {

    private String name;

    private String email;

    private String password;

    private Role role;
}