package com.xinrong.dao;

import com.xinrong.bean.Investrecord;

public interface InvestrecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Investrecord record);

    int insertSelective(Investrecord record);

    Investrecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Investrecord record);

    int updateByPrimaryKey(Investrecord record);
}