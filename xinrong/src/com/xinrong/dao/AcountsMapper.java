package com.xinrong.dao;

import com.xinrong.bean.Acounts;

public interface AcountsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Acounts record);

    int insertSelective(Acounts record);

    Acounts selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Acounts record);

    int updateByPrimaryKey(Acounts record);
}