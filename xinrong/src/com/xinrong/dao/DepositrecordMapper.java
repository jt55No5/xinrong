package com.xinrong.dao;

import com.xinrong.bean.Depositrecord;

public interface DepositrecordMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Depositrecord record);

    int insertSelective(Depositrecord record);

    Depositrecord selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Depositrecord record);

    int updateByPrimaryKey(Depositrecord record);
}