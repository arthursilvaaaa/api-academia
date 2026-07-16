package com.api.academia.Controller;

import com.api.academia.DTO.request.AlunoRequestDTO;
import com.api.academia.DTO.response.AlunoResponseDTO;
import com.api.academia.Mapper.AlunoMapper;
import com.api.academia.Model.AlunoModel;
import com.api.academia.Service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoService alunoService;
    private final AlunoMapper alunoMapper;

    @GetMapping
    public ResponseEntity<List<AlunoResponseDTO>> list(){
        return ResponseEntity.ok(alunoService.findAll()
                .stream()
                .map(alunoMapper::toResponse)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> findById(@PathVariable long id){
        AlunoModel alunoModel = alunoService.findById(id);
        AlunoResponseDTO alunoResponseDTO = alunoMapper.toResponse(alunoModel);
        return ResponseEntity.ok(alunoResponseDTO);
    }

    @PostMapping
    public ResponseEntity<AlunoResponseDTO> save(@Valid @RequestBody AlunoRequestDTO alunoRequestDTO){
        AlunoModel alunoModel = alunoMapper.toModel(alunoRequestDTO);
        AlunoModel savedAlunoModel = alunoService.save(alunoModel);
        AlunoResponseDTO alunoResponseDTO = alunoMapper.toResponse(savedAlunoModel);
        return ResponseEntity.status(201).body(alunoResponseDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AlunoResponseDTO> delete(@PathVariable long id){
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
