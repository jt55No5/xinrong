package com.xinrong.bean;

import java.util.Date;

public class Users {
    private Integer id;

    private String username;

    private String password;

    private String name;

    private String identifyno;

    private Integer vipid;

    private String phonenumber;

    private String email;

    private Integer adressid;

    private Integer creditlevel;

    private Integer bankid;

    private Integer bankadressid;

    private String banknumber;

    private Integer actualnamestatus;

    private Date createdate;

    private Date modifydate;

    private Double restminpayment;

    private Integer latedays;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getIdentifyno() {
        return identifyno;
    }

    public void setIdentifyno(String identifyno) {
        this.identifyno = identifyno == null ? null : identifyno.trim();
    }

    public Integer getVipid() {
        return vipid;
    }

    public void setVipid(Integer vipid) {
        this.vipid = vipid;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber == null ? null : phonenumber.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getAdressid() {
        return adressid;
    }

    public void setAdressid(Integer adressid) {
        this.adressid = adressid;
    }

    public Integer getCreditlevel() {
        return creditlevel;
    }

    public void setCreditlevel(Integer creditlevel) {
        this.creditlevel = creditlevel;
    }

    public Integer getBankid() {
        return bankid;
    }

    public void setBankid(Integer bankid) {
        this.bankid = bankid;
    }

    public Integer getBankadressid() {
        return bankadressid;
    }

    public void setBankadressid(Integer bankadressid) {
        this.bankadressid = bankadressid;
    }

    public String getBanknumber() {
        return banknumber;
    }

    public void setBanknumber(String banknumber) {
        this.banknumber = banknumber == null ? null : banknumber.trim();
    }

    public Integer getActualnamestatus() {
        return actualnamestatus;
    }

    public void setActualnamestatus(Integer actualnamestatus) {
        this.actualnamestatus = actualnamestatus;
    }

    public Date getCreatedate() {
        return createdate;
    }

    public void setCreatedate(Date createdate) {
        this.createdate = createdate;
    }

    public Date getModifydate() {
        return modifydate;
    }

    public void setModifydate(Date modifydate) {
        this.modifydate = modifydate;
    }

    public Double getRestminpayment() {
        return restminpayment;
    }

    public void setRestminpayment(Double restminpayment) {
        this.restminpayment = restminpayment;
    }

    public Integer getLatedays() {
        return latedays;
    }

    public void setLatedays(Integer latedays) {
        this.latedays = latedays;
    }
}