package com.api.academia.Service;

import com.api.academia.DTO.request.InstrutorRequestDTO;
import com.api.academia.Mapper.InstrutorMapper;
import com.api.academia.Model.InstrutorModel;
import com.api.academia.Repository.InstrutorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstrutorService {
    private final InstrutorRepository instrutorRepository;
    private final InstrutorMapper instrutorMapper;

    public List<InstrutorModel> findAll() {
        return instrutorRepository.findAll();
    }

    public InstrutorModel findById(long id) {
        return instrutorRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Instrutor não encontrado"));
    }

    public InstrutorModel save(InstrutorRequestDTO dto) {
        InstrutorModel instrutorModel = instrutorMapper.toModel(dto);
        return instrutorRepository.save(instrutorModel);
    }

    public void delete(long id) {
        if (!instrutorRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Instrutor não encontrado");
        }
        instrutorRepository.deleteById(id);
    }
}
