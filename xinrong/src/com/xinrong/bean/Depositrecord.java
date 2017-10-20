package com.xinrong.bean;

import java.util.Date;

public class Depositrecord {
    private Integer id;

    private Integer userid;

    private String serialnum;

    private Integer transactiontype;

    private Double transactionamount;

    private Double interest;

    private Integer transactionmode;

    private Date transactiondate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getSerialnum() {
        return serialnum;
    }

    public void setSerialnum(String serialnum) {
        this.serialnum = serialnum == null ? null : serialnum.trim();
    }

    public Integer getTransactiontype() {
        return transactiontype;
    }

    public void setTransactiontype(Integer transactiontype) {
        this.transactiontype = transactiontype;
    }

    public Double getTransactionamount() {
        return transactionamount;
    }

    public void setTransactionamount(Double transactionamount) {
        this.transactionamount = transactionamount;
    }

    public Double getInterest() {
        return interest;
    }

    public void setInterest(Double interest) {
        this.interest = interest;
    }

    public Integer getTransactionmode() {
        return transactionmode;
    }

    public void setTransactionmode(Integer transactionmode) {
        this.transactionmode = transactionmode;
    }

    public Date getTransactiondate() {
        return transactiondate;
    }

    public void setTransactiondate(Date transactiondate) {
        this.transactiondate = transactiondate;
    }
}