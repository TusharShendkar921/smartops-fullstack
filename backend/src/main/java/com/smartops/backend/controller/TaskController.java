package com.smartops.backend.controller;

import com.smartops.backend.dto.TaskRequest;
import com.smartops.backend.entity.*;
import com.smartops.backend.repository.ProjectRepository;
import com.smartops.backend.repository.TaskRepository;
import com.smartops.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public Task createTask(@RequestBody TaskRequest request) {

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        User assignedUser = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new RuntimeException("Assigned user not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .status(TaskStatus.valueOf(request.getStatus().toUpperCase()))
                .priority(TaskPriority.valueOf(request.getPriority().toUpperCase()))
                .deadline(request.getDeadline())
                .project(project)
                .assignedTo(assignedUser)
                .build();

        return taskRepository.save(task);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public List<Task> getTasksByUser(@PathVariable Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    @PatchMapping("/{taskId}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'USER')")
    public Task updateTaskStatus(@PathVariable Long taskId, @RequestParam String status) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setStatus(TaskStatus.valueOf(status.toUpperCase()));
        return taskRepository.save(task);
    }
}