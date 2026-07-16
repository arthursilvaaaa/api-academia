package com.api.academia.Service;

import com.api.academia.Mapper.AlunoMapper;
import com.api.academia.Model.AlunoModel;
import com.api.academia.Repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlunoService {
    private final AlunoRepository alunoRepository;
    private final AlunoMapper alunoMapper;

    public List<AlunoModel> findAll() {
        return alunoRepository.findAll();
    }

    public AlunoModel findById(long id) {
        return alunoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado"));
    }

    public AlunoModel save(AlunoModel alunoModel) {
        return alunoRepository.save(alunoModel);
    }

    public void delete(long id) {
        if (!alunoRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Aluno não encontrado");
        }
        alunoRepository.deleteById(id);
    }
}
