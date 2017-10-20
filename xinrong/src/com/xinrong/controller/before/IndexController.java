package com.xinrong.controller.before;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xinrong.service.ProvincesService;

@Controller
public class IndexController {
	@Autowired
	private ProvincesService provincesService;

	public ProvincesService getProvincesService() {
		return provincesService;
	}

	public void setProvincesService(ProvincesService provincesService) {
		this.provincesService = provincesService;
	}
	
	@RequestMapping("www.xinrong.com/index.html")
	public String goIntoIndex(){
		return "www.xinrong.com/index";
	}
}
