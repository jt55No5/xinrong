package com.xinrong.dao;

import com.xinrong.bean.Nnderwritingcompany;

public interface NnderwritingcompanyMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Nnderwritingcompany record);

    int insertSelective(Nnderwritingcompany record);

    Nnderwritingcompany selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Nnderwritingcompany record);

    int updateByPrimaryKey(Nnderwritingcompany record);
}