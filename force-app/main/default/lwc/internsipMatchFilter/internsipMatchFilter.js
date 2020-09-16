import { LightningElement, wire, track } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import { CurrentPageReference } from "lightning/navigation";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import SITE_OBJECT from "@salesforce/schema/Site__c";
import MARKET_FIELD from "@salesforce/schema/Site__c.Market__c";
import RULE_OBJECT from "@salesforce/schema/MATCH_Matching_Rule__c";
import ENG_OBJECT from "@salesforce/schema/Engagement__c";
import { fireEvent } from "c/pubsub";
import getSites from "@salesforce/apex/MATCH_lwcController.getSiteList";
import getLcs from "@salesforce/apex/MATCH_lwcController.getLCList";
import getFilterList from "@salesforce/apex/MATCH_lwcController.getFilterList";

export default class InternsipMatchFilter extends LightningElement {
  marketvalue = "YUAZ";
  sitevalue = "";
  lcvalue = "";
  sites = [];
  lcs = [];
  tracks = [];
  specialties = [];
  students = [];
  error;
  studentRecords = [];
  engstatusvalue = "All";
  lcname = "";
  trackname = "";
  specialtyname = "";
  status = "";
  rating = "";
  hideShowSeciton = true;
  get statusoptions() {
    return [
      { label: "Enrolled", value: "Enrolled" },
      { label: "Fired", value: "Fired" }
    ];
  }

  get ratingoptions() {
    return [
      { label: "On Track", value: "On Track" },
      { label: "Off Track", value: "Off Track" },
      { label: "Exceeding Expectations", value: "Exceeding Expectations" }
    ];
  }

  connectedCallback() {
    this.handleSiteChange(
      this.marketvalue,
      this.sitevalue,
      this.lcname,
      this.trackname,
      this.specialtyname,
      this.status,
      this.rating
    );
  }

  hidefilter() {
    fireEvent(this.pageRef, "hideFilter", false);
  }

  renderedCallback() {
    const style = document.createElement("style");
    style.innerText = `c-internship-match-filter .slds-card__header {
        background-color: #54C2B2;
        }`;
  }

  @wire(CurrentPageReference) pageRef;

  @wire(getObjectInfo, { objectApiName: SITE_OBJECT })
  objectInfo;

  @wire(getObjectInfo, { objectApiName: RULE_OBJECT })
  ruleobjectInfo;

  @wire(getObjectInfo, { objectApiName: ENG_OBJECT })
  engobjectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: MARKET_FIELD
  })
  MarketPicklistValues;

  @wire(getSites, { marketName: "$marketvalue" })
  wiredSites(value) {
    const { data, error } = value;
    if (data) {
      this.dataArray = data;
      let tempArray = [];
      this.dataArray.forEach(function (element) {
        var option = {
          label: element.Name,
          value: element.Name
        };
        tempArray.push(option);
      });
      this.sites = tempArray;
    } else if (error) {
      this.error = error;
    }
  }

  handleChange(event) {
    let value = event.detail.value;
    let name = event.target.name;

    switch (name) {
      case "market":
        this.marketvalue = value;
        this.handleFilterChange(this.marketvalue, this.sitevalue);
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "site":
        this.sitevalue = value;
        this.handleFilterChange(this.marketvalue, this.sitevalue);
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "lc":
        this.lcname = value;
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "track":
        this.trackname = value;
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "specialty":
        this.specialtyname = value;
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "engagementStatus":
        this.status = value;
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      case "rating":
        this.rating = value;
        this.handleSiteChange(
          this.marketvalue,
          this.sitevalue,
          this.lcname,
          this.trackname,
          this.specialtyname,
          this.status,
          this.rating
        );
        break;
      default:
      // code block
    }
  }

  handleSiteChange(
    marketName,
    siteName,
    lcName,
    track,
    specialty,
    status,
    rating
  ) {
    getLcs({
      marketName: marketName,
      siteName: siteName,
      lcName: lcName,
      track: track,
      specialty: specialty,
      status: status,
      rating: rating
    })
      .then((result) => {
        this.dataArray = result;
        this.studentRecords = result;
        if (this.dataArray != null) {
          if (!this.pageRef) {
            this.pageRef = {};
            this.pageRef.attributes = {};
            this.pageRef.attributes.LightningApp = "LightningApp";
          }
          fireEvent(this.pageRef, "studentRecords", this.studentRecords);
        }
      })
      .catch((error) => {
        this.error = error;
      });
  }

  handleFilterChange(marketName, siteName) {
    getFilterList({ marketName: marketName, siteName: siteName })
      .then((result) => {
        this.dataArray = result;
        let lcs = [];
        let tracks = [];
        let specialties = [];
        if (this.dataArray != null) {
          this.dataArray.forEach(function (element) {
            var lc = {
              label: element.Learning_Community_Name__c,
              value: element.Learning_Community_Name__c
            };
            lcs.push(lc);

            var track = {
              label: element.Track_Family_Name__c,
              value: element.Track_Family_Name__c
            };
            tracks.push(track);

            var specialty = {
              label: element.Specialty_Name__c,
              value: element.Specialty_Name__c
            };
            specialties.push(specialty);
          });
        }

        this.lcs = lcs;
        this.tracks = tracks;
        this.specialties = specialties;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
