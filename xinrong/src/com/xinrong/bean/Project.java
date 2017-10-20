package com.xinrong.bean;

import java.util.Date;

public class Project {
    private Integer id;

    private String projectname;

    private Integer projectfinancingtime;

    private Integer projectduration;

    private Date projectcreationtime;

    private Date projectaudittime;

    private Date startdatefinancing;

    private Double expectedannualized;

    private Integer seriesid;

    private Double expectedfinancingamount;

    private Double actualfinancingamount;

    private Integer insurancecompanyid;

    private Integer financinguserid;

    private Integer projectprogress;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProjectname() {
        return projectname;
    }

    public void setProjectname(String projectname) {
        this.projectname = projectname == null ? null : projectname.trim();
    }

    public Integer getProjectfinancingtime() {
        return projectfinancingtime;
    }

    public void setProjectfinancingtime(Integer projectfinancingtime) {
        this.projectfinancingtime = projectfinancingtime;
    }

    public Integer getProjectduration() {
        return projectduration;
    }

    public void setProjectduration(Integer projectduration) {
        this.projectduration = projectduration;
    }

    public Date getProjectcreationtime() {
        return projectcreationtime;
    }

    public void setProjectcreationtime(Date projectcreationtime) {
        this.projectcreationtime = projectcreationtime;
    }

    public Date getProjectaudittime() {
        return projectaudittime;
    }

    public void setProjectaudittime(Date projectaudittime) {
        this.projectaudittime = projectaudittime;
    }

    public Date getStartdatefinancing() {
        return startdatefinancing;
    }

    public void setStartdatefinancing(Date startdatefinancing) {
        this.startdatefinancing = startdatefinancing;
    }

    public Double getExpectedannualized() {
        return expectedannualized;
    }

    public void setExpectedannualized(Double expectedannualized) {
        this.expectedannualized = expectedannualized;
    }

    public Integer getSeriesid() {
        return seriesid;
    }

    public void setSeriesid(Integer seriesid) {
        this.seriesid = seriesid;
    }

    public Double getExpectedfinancingamount() {
        return expectedfinancingamount;
    }

    public void setExpectedfinancingamount(Double expectedfinancingamount) {
        this.expectedfinancingamount = expectedfinancingamount;
    }

    public Double getActualfinancingamount() {
        return actualfinancingamount;
    }

    public void setActualfinancingamount(Double actualfinancingamount) {
        this.actualfinancingamount = actualfinancingamount;
    }

    public Integer getInsurancecompanyid() {
        return insurancecompanyid;
    }

    public void setInsurancecompanyid(Integer insurancecompanyid) {
        this.insurancecompanyid = insurancecompanyid;
    }

    public Integer getFinancinguserid() {
        return financinguserid;
    }

    public void setFinancinguserid(Integer financinguserid) {
        this.financinguserid = financinguserid;
    }

    public Integer getProjectprogress() {
        return projectprogress;
    }

    public void setProjectprogress(Integer projectprogress) {
        this.projectprogress = projectprogress;
    }
}