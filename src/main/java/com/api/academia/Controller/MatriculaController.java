package com.api.academia.Controller;

import com.api.academia.Model.MatriculaModel;
import com.api.academia.Service.MatriculaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
@RequiredArgsConstructor
public class MatriculaController {
    private final MatriculaService matriculaService;

    @GetMapping
    public ResponseEntity<List<MatriculaModel>>findAll(){
        return ResponseEntity.ok(matriculaService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<MatriculaModel> findById(@PathVariable long id){
        return ResponseEntity.ok(matriculaService.findById(id));
    }
    @PostMapping
    public ResponseEntity<MatriculaModel> save(@RequestBody MatriculaModel matriculaModel){
        return ResponseEntity.ok(matriculaService.save(matriculaModel));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<MatriculaModel> delete(@PathVariable long id){
        matriculaService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
