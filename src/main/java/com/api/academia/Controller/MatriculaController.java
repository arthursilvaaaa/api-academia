package com.api.academia.Controller;

import com.api.academia.DTO.request.MatriculaRequestDTO;
import com.api.academia.DTO.response.MatriculaResponseDTO;
import com.api.academia.Mapper.MatriculaMapper;
import com.api.academia.Model.MatriculaModel;
import com.api.academia.Service.MatriculaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
@RequiredArgsConstructor
public class MatriculaController {
    private final MatriculaService matriculaService;
    private final MatriculaMapper matriculaMapper;

    @GetMapping
    public ResponseEntity<List<MatriculaResponseDTO>>findAll(){
        return ResponseEntity.ok(matriculaService.findAll()
                .stream()
                .map(matriculaMapper::toResponse)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MatriculaResponseDTO> findById(@PathVariable long id){
        MatriculaModel matriculaModel = matriculaService.findById(id);
        MatriculaResponseDTO dto = matriculaMapper.toResponse(matriculaModel);
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    public ResponseEntity<MatriculaResponseDTO> save(@Valid @RequestBody MatriculaRequestDTO matriculaRequestDTO){
        MatriculaModel salvo = matriculaService.save(matriculaRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(matriculaMapper.toResponse(salvo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        matriculaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
