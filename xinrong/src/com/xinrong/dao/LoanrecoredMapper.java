package com.xinrong.dao;

import com.xinrong.bean.Loanrecored;

public interface LoanrecoredMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Loanrecored record);

    int insertSelective(Loanrecored record);

    Loanrecored selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Loanrecored record);

    int updateByPrimaryKey(Loanrecored record);
}