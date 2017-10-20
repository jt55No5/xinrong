package com.xinrong.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xinrong.bean.Provinces;
import com.xinrong.dao.ProvincesMapper;
import com.xinrong.service.ProvincesService;

@Service
public class ProvincesServiceImpl implements ProvincesService{
	@Autowired
	private ProvincesMapper provincesMapper;
	
	
	
	public ProvincesMapper getProvincesMapper() {
		return provincesMapper;
	}

	public void setProvincesMapper(ProvincesMapper provincesMapper) {
		this.provincesMapper = provincesMapper;
	}

	@Override
	public int deleteByPrimaryKey(Integer id) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Provinces record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(Provinces record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Provinces selectByPrimaryKey(Integer id) {
		return provincesMapper.selectByPrimaryKey(id);
	}

	@Override
	public int updateByPrimaryKeySelective(Provinces record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Provinces record) {
		// TODO Auto-generated method stub
		return 0;
	}

}
