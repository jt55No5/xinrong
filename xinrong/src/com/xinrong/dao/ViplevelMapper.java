package com.xinrong.dao;

import com.xinrong.bean.Viplevel;

public interface ViplevelMapper {
    int deleteByPrimaryKey(Integer vipid);

    int insert(Viplevel record);

    int insertSelective(Viplevel record);

    Viplevel selectByPrimaryKey(Integer vipid);

    int updateByPrimaryKeySelective(Viplevel record);

    int updateByPrimaryKey(Viplevel record);
}