package test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.xinrong.bean.Provinces;
import com.xinrong.service.ProvincesService;

public class Test {

	public static void main(String[] args) {
		ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
		ProvincesService provincesService=(ProvincesService)context.getBean("provincesServiceImpl");
		Provinces provinces=provincesService.selectByPrimaryKey(1);
		System.out.println(provinces.getProvince());
	}
}
