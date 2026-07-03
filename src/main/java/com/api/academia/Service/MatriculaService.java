package com.api.academia.Service;

import com.api.academia.Model.MatriculaModel;
import com.api.academia.Repository.MatriculaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatriculaService {
    private final MatriculaRepository matriculaRepository;

    public List<MatriculaModel> findAll() {
        return matriculaRepository.findAll();
    }

    public MatriculaModel findById(long id) {
        return matriculaRepository.findById(id)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NO_CONTENT,"Matrícula não encontrada."));
    }

    public MatriculaModel save(MatriculaModel matriculaModel) {
        return matriculaRepository.save(matriculaModel);
    }

    public void delete(long id) {
        if (!matriculaRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Matrícula não encontrada.");
        }
        matriculaRepository.deleteById(id);
    }
}
