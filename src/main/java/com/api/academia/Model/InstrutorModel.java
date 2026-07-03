package com.api.academia.Model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InstrutorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false)
    private String especialidade;

    @OneToMany(mappedBy = "instrutorModel", cascade = CascadeType.ALL)
    private List<AulaModel> aulaModel = new ArrayList<>();
}
