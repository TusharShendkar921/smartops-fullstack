package com.smartops.backend.controller;

import com.smartops.backend.dto.ProjectRequest;
import com.smartops.backend.entity.Project;
import com.smartops.backend.entity.ProjectStatus;
import com.smartops.backend.entity.Team;
import com.smartops.backend.repository.ProjectRepository;
import com.smartops.backend.repository.TeamRepository;
import com.smartops.backend.service.ActivityLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectRepository projectRepository;
    private final TeamRepository teamRepository;
    private final ActivityLogService activityLogService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Project createProject(@RequestBody ProjectRequest request) {

        Team team = teamRepository.findById(request.getTeamId())
                .orElseThrow(() -> new RuntimeException("Team not found"));

        Project project = Project.builder()
                .name(request.getName())
                .description(request.getDescription())
                .status(ProjectStatus.valueOf(request.getStatus().toUpperCase()))
                .deadline(request.getDeadline())
                .team(team)
                .build();

        Project savedProject = projectRepository.save(project);

        activityLogService.log(
                "CREATE",
                "PROJECT",
                savedProject.getId(),
                "Project created: " + savedProject.getName()
        );

        return savedProject;
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}