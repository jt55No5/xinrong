package com.xinrong.bean;

public class Series {
    private Integer id;

    private String seriesname;

    private Double minexpectedamount;

    private Double maxexpectedamount;

    private Integer minfinancingtime;

    private Integer maxfinancingtime;

    private Integer minduration;

    private Integer maxduration;

    private Integer receivableway;

    private Double minexpectedannualized;

    private Double maxexpectedannualized;

    private Integer capitauses;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSeriesname() {
        return seriesname;
    }

    public void setSeriesname(String seriesname) {
        this.seriesname = seriesname == null ? null : seriesname.trim();
    }

    public Double getMinexpectedamount() {
        return minexpectedamount;
    }

    public void setMinexpectedamount(Double minexpectedamount) {
        this.minexpectedamount = minexpectedamount;
    }

    public Double getMaxexpectedamount() {
        return maxexpectedamount;
    }

    public void setMaxexpectedamount(Double maxexpectedamount) {
        this.maxexpectedamount = maxexpectedamount;
    }

    public Integer getMinfinancingtime() {
        return minfinancingtime;
    }

    public void setMinfinancingtime(Integer minfinancingtime) {
        this.minfinancingtime = minfinancingtime;
    }

    public Integer getMaxfinancingtime() {
        return maxfinancingtime;
    }

    public void setMaxfinancingtime(Integer maxfinancingtime) {
        this.maxfinancingtime = maxfinancingtime;
    }

    public Integer getMinduration() {
        return minduration;
    }

    public void setMinduration(Integer minduration) {
        this.minduration = minduration;
    }

    public Integer getMaxduration() {
        return maxduration;
    }

    public void setMaxduration(Integer maxduration) {
        this.maxduration = maxduration;
    }

    public Integer getReceivableway() {
        return receivableway;
    }

    public void setReceivableway(Integer receivableway) {
        this.receivableway = receivableway;
    }

    public Double getMinexpectedannualized() {
        return minexpectedannualized;
    }

    public void setMinexpectedannualized(Double minexpectedannualized) {
        this.minexpectedannualized = minexpectedannualized;
    }

    public Double getMaxexpectedannualized() {
        return maxexpectedannualized;
    }

    public void setMaxexpectedannualized(Double maxexpectedannualized) {
        this.maxexpectedannualized = maxexpectedannualized;
    }

    public Integer getCapitauses() {
        return capitauses;
    }

    public void setCapitauses(Integer capitauses) {
        this.capitauses = capitauses;
    }
}