package com.smartops.backend.controller;

import com.smartops.backend.dto.TeamRequest;
import com.smartops.backend.entity.Team;
import com.smartops.backend.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teams")
@RequiredArgsConstructor
public class TeamController {

    private final TeamRepository teamRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Team createTeam(@RequestBody TeamRequest request) {
        Team team = Team.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();

        return teamRepository.save(team);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Team> getAllTeams() {
        return teamRepository.findAll();
    }
}