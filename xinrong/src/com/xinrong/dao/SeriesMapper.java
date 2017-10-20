package com.xinrong.dao;

import com.xinrong.bean.Series;

public interface SeriesMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Series record);

    int insertSelective(Series record);

    Series selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Series record);

    int updateByPrimaryKey(Series record);
}