package com.api.academia.Controller;

import com.api.academia.DTO.request.InstrutorRequestDTO;
import com.api.academia.DTO.response.InstrutorResponseDTO;
import com.api.academia.Mapper.InstrutorMapper;
import com.api.academia.Model.InstrutorModel;
import com.api.academia.Service.InstrutorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/instrutores")
@RequiredArgsConstructor
public class InstrutorController {
    private final InstrutorService instrutorService;
    private final InstrutorMapper instrutorMapper;

    @GetMapping
    public ResponseEntity<List<InstrutorResponseDTO>> listAll(){
        return ResponseEntity.ok(
                instrutorService.findAll()
                        .stream()
                        .map(instrutorMapper::toResponse)
                        .toList());
    }
    @GetMapping("/{id}")
    public ResponseEntity<InstrutorResponseDTO> findById(@PathVariable long id){
        InstrutorModel instrutorModel = instrutorService.findById(id);
        InstrutorResponseDTO instrutorResponseDTO = instrutorMapper.toResponse(instrutorModel);
        return ResponseEntity.ok(instrutorResponseDTO);
    }

    @PostMapping
    public ResponseEntity<InstrutorResponseDTO> save(@Valid @RequestBody InstrutorRequestDTO instrutorRequestDTO){
        InstrutorModel salvo = instrutorService.save(instrutorRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(instrutorMapper.toResponse(salvo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        instrutorService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
