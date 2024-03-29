package com.zavrsnirad.CodeFlow.controllers;

import com.zavrsnirad.CodeFlow.domain.Programmer;
import com.zavrsnirad.CodeFlow.dto.json.SolutionDtoJson;
import com.zavrsnirad.CodeFlow.dto.mappers.MapperSolution;
import com.zavrsnirad.CodeFlow.dto.req.SolutionDtoReq;
import com.zavrsnirad.CodeFlow.dto.req.SolutionUpdateDtoReq;
import com.zavrsnirad.CodeFlow.service.ProgrammerService;
import com.zavrsnirad.CodeFlow.service.SolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/solution")
public class SolutionController {

    @Autowired
    private ProgrammerService programmerService;

    @Autowired
    private SolutionService solutionService;

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getSolutionById(@PathVariable("id") Long id, Principal principal) {
        Programmer programmer = programmerService.findByUsername(principal.getName());

        SolutionDtoJson response = MapperSolution.SolutionToJson(solutionService.findSolutionById(id), programmer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/create/{taskId}")
    public ResponseEntity<?> createSolutionForTaskId(@PathVariable("taskId") Long taskId, @RequestBody SolutionDtoReq solutionDtoReq, Principal principal) {
        Programmer programmer = programmerService.findByUsername(principal.getName());

        SolutionDtoJson response = MapperSolution.SolutionToJson(solutionService.addSolution(taskId, solutionDtoReq, programmer), programmer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/update/{solutionId}")
    public ResponseEntity<?> updateSolutionForSolutionId(@PathVariable("solutionId") Long solutionId, @RequestBody SolutionUpdateDtoReq solutionUpdateDtoReq, Principal principal){
        Programmer programmer = programmerService.findByUsername(principal.getName());

        SolutionDtoJson response = MapperSolution.SolutionToJson(solutionService.updateSolution(solutionId, solutionUpdateDtoReq, programmer), programmer);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/delete/{solutionId}")
    public ResponseEntity<?> deleteSolutionForSolutionId(@PathVariable("solutionId") Long solutionId, Principal principal){
        Programmer programmer = programmerService.findByUsername(principal.getName());

        solutionService.deleteSolution(solutionId, programmer);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
