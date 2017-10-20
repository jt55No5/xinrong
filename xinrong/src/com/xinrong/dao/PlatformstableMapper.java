package com.xinrong.dao;

import com.xinrong.bean.Platformstable;

public interface PlatformstableMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Platformstable record);

    int insertSelective(Platformstable record);

    Platformstable selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Platformstable record);

    int updateByPrimaryKey(Platformstable record);
}