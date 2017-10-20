package com.xinrong.bean;

public class Address {
    private Integer id;

    private Integer type;

    private Integer provinceid;

    private Integer citiesid;

    private Integer areasid;

    private String detailadress;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getProvinceid() {
        return provinceid;
    }

    public void setProvinceid(Integer provinceid) {
        this.provinceid = provinceid;
    }

    public Integer getCitiesid() {
        return citiesid;
    }

    public void setCitiesid(Integer citiesid) {
        this.citiesid = citiesid;
    }

    public Integer getAreasid() {
        return areasid;
    }

    public void setAreasid(Integer areasid) {
        this.areasid = areasid;
    }

    public String getDetailadress() {
        return detailadress;
    }

    public void setDetailadress(String detailadress) {
        this.detailadress = detailadress == null ? null : detailadress.trim();
    }
}