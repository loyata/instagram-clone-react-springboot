package ca.uottawa.ins.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @RestController = @ResponsiveBody + @Controller
 * @ResponsiveBody: 类中的所有方法是给浏览器返回字符串, 而不是跳转到页面
 * @RequestMapping: 绝对路径就是localhost:8080
 */
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String handle01(){
        return "Hello, Spring Boot 2";
    }

    @RequestMapping("/")
    public String handle02(){
        return "index";
    }
}