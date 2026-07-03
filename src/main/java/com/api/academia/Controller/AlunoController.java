package com.api.academia.Controller;

import com.api.academia.Model.AlunoModel;
import com.api.academia.Service.AlunoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alunos")
public class AlunoController {
    private final AlunoService alunoService;

    @GetMapping
    public ResponseEntity<List<AlunoModel>> list(){
        return ResponseEntity.ok(alunoService.listAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoModel> findById(@PathVariable long id){
        return ResponseEntity.ok(alunoService.findById(id));
    }

    @PostMapping
    public ResponseEntity<AlunoModel> save(@RequestBody AlunoModel alunoModel){
        return ResponseEntity.ok(alunoService.save(alunoModel));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AlunoModel> delete(@PathVariable long id){
        alunoService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
