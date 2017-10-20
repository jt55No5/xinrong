package com.xinrong.bean;

public class Viplevel {
    private Integer vipid;

    private String vipname;

    private Double commission;

    private Double commissiondis;

    public Integer getVipid() {
        return vipid;
    }

    public void setVipid(Integer vipid) {
        this.vipid = vipid;
    }

    public String getVipname() {
        return vipname;
    }

    public void setVipname(String vipname) {
        this.vipname = vipname == null ? null : vipname.trim();
    }

    public Double getCommission() {
        return commission;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Double getCommissiondis() {
        return commissiondis;
    }

    public void setCommissiondis(Double commissiondis) {
        this.commissiondis = commissiondis;
    }
}