package com.devsuperior.dspesquisa.repositories;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.devsuperior.dspesquisa.entities.Record;

@Repository
public interface RecordRepository extends  JpaRepository<Record, Long>{

	@Query("SELECT obj FROM Record obj WHERE " // FROM requires class name
			+"(coalesce(:min, null) IS NULL OR obj.moment >= :min) AND " // coalesce() function is required to make the expression 
			+"(coalesce(:max, null) IS NULL OR obj.moment <= :max)") 	 // work in PostgreSQL
	Page<Record> findByMoments(Instant min, Instant max, Pageable pageable);

}
