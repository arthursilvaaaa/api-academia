package com.api.academia.Controller;

import com.api.academia.DTO.request.AulaRequestDTO;
import com.api.academia.DTO.response.AulaResponseDTO;
import com.api.academia.Mapper.AulaMapper;
import com.api.academia.Model.AulaModel;
import com.api.academia.Service.AulaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/aulas")
public class AulaController {
    private final AulaService aulaService;
    private final AulaMapper aulaMapper;

    @GetMapping
    public ResponseEntity<List<AulaResponseDTO>> list() {
        return ResponseEntity.ok(
                aulaService.listAll().stream()
                        .map(aulaMapper::toResponse)
                        .toList()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AulaResponseDTO> findById(@PathVariable long id){
        AulaModel aulaModel = aulaService.findById(id);
        AulaResponseDTO aulaResponseDTO = aulaMapper.toResponse(aulaModel);
        return ResponseEntity.ok(aulaResponseDTO);
    }

    @PostMapping
    public ResponseEntity<AulaResponseDTO> save(@RequestBody AulaRequestDTO aulaRequestDTO){
        AulaModel salvo = aulaService.save(aulaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(aulaMapper.toResponse(salvo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        aulaService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
