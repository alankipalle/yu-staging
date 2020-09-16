import { LightningElement, track, wire, api } from "lwc";
import studentPhoto from "@salesforce/resourceUrl/stdPhotoAvtar";
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import STUDENT_OBJECT from "@salesforce/schema/MATCH_Matching_Student__c";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import PHOTO_URL from "@salesforce/schema/MATCH_Matching_Student__c.Student_Photo_ID__c";
import STUDENT_NAME from "@salesforce/schema/MATCH_Matching_Student__c.Market_Name__c";
import ADDRESS from "@salesforce/schema/MATCH_Matching_Student__c.Address__c";
import getStudentSurvey from "@salesforce/apex/MATCH_lwcController.getStudentSurveyResult";
const fields = [PHOTO_URL];

import { registerListener, unregisterAllListeners } from "c/pubsub";
export default class StudentDetails extends LightningElement {
  openModel = false;
  studentRecords = [];
  studentRecordId;
  objectname = "MATCH_Matching_Student__c";
  @api objectApiName = "MATCH_Matching_Student__c";
  surveyobjectApiName = "MATCH_Matching_Survey_Result__c";
  @wire(CurrentPageReference) pageRef;
  @api recordId;
  objectInfo;
  recordTypeId;
  surveyrecordTypeId;
  studentsAvailable = false;
  @api flexipageRegionWidth;
  studentName;
  section = true;
  label = "Hide Filter";
  studentvalue;
  internRecord;
  internRecordName = "";
  finalizedMatches = 0;
  finalizeStatus = "Not Finalized";
  badgeColor = "slds-badge slds-theme_success";
  fields = [
    "Corporate_Partner_Preference__c",
    "Industry_Preference__c",
    "Internship_Partner_Size_Preference__c",
    "Internship_Roles_Preference__c",
    "Customer_Interaction__c",
    "Internship_Tasks__c",
    "Team_Culture_Preference__c",
    "Team_Structure_Preference__c",
    "Work_Type_Preference__c",
    "Other_Notes__c",
    "Market_Name__c",
    "Name"
  ];

  mapMarkers = [
    {
      location: {
        Latitude: "37.790197",
        Longitude: "-122.396879"
      }
    }
  ];

  skillfields = ["Top_Professional_Skills__c", "Top_Technical_Skills__c"];
  preferencefields = [
    "Internship_Readiness_Rating__c",
    "Recent_Absences__c",
    "Recent_Lates__c",
    "Recent_Contract_Impact_Points__c"
  ];
  @wire(CurrentPageReference) pageRef;
  @wire(getRecord, { recordId: "$recordId", fields })
  student;

  get photoId() {
    return getFieldValue(this.student.data, PHOTO_URL) != null
      ? getFieldValue(this.student.data, PHOTO_URL)
      : studentPhoto;
  }

  get studentName() {
    return getFieldValue(this.student.data, STUDENT_NAME);
  }

  @wire(getObjectInfo, { objectApiName: STUDENT_OBJECT })
  handleObjectInfo({ error, data }) {
    if (data) {
      const rtis = data.recordTypeInfos;
      this.recordTypeId = Object.keys(rtis).find(
        (rti) => rtis[rti].name === "Matching Layout"
      );
    }
  }

  handleEdit(event) {
    this.template.querySelector("c-record-edit-form").openModal();
  }

  connectedCallback() {
    if (!this.pageRef) {
      this.pageRef = {};
      this.pageRef.attributes = {};
      this.pageRef.attributes.LightningApp = "LightningApp";
    }
    // subscribe to bearListUpdate event
    registerListener("studentRecords", this.handleStudentList, this);
    registerListener("modelStatus", this.handleModel, this);
    registerListener("matchRecord", this.handleMatchRecord, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  handleMatchRecord(record) {
    this.internRecord = "/" + record.Internship_Salesforce_ID__c;
    this.internRecordName = record.Internship_Name__c;
    this.badgeColor = "slds-badge slds-theme_error";
    this.finalizeStatus = "Match Fianlized";
  }

  handleStudentList(students) {
    this.badgeColor = "slds-badge slds-theme_success";
    this.finalizeStatus = "Not Fianlized";
    this.internRecord = "";
    this.internRecordName = "";
    let studentRecds = [];
    if (students != null) {
      students.forEach(function (element) {
        var std = {
          label: element.Name,
          value: element.Id
        };
        studentRecds.push(std);
      });
      this.studentRecords = studentRecds;
    }

    this.studentvalue = studentRecds[0].value;
    this.recordId = studentRecds[0].value;
    this.studentName = studentRecds[0].label;
    this.objectApiName = "MATCH_Matching_Student__c";
    fireEvent(this.pageRef, "studentRecordId", this.studentvalue);
    fireEvent(this.pageRef, "stdRecord", students[0]);
    if (this.studentRecords.length > 0) this.studentsAvailable = true;
  }

  handleModel(status) {
    this.openModel = status;
  }

  handleChange(event) {
    this.badgeColor = "slds-badge slds-theme_success";
    this.finalizeStatus = "Not Fianlized";
    this.internRecord = "";
    this.internRecordName = "";
    this.studentRecordId = event.detail.value;
    this.recordId = event.detail.value;
    this.objectApiName = "MATCH_Matching_Student__c";
    this.studentSurvey();

    fireEvent(this.pageRef, "studentRecordId", this.studentRecordId);
  }

  handleFilterStatus() {
    this.section = !this.section;
    this.label = this.section === true ? "Hide Filter" : "Show Filter";
    fireEvent(this.pageRef, "hideFilter", this.section);
  }

  closeModal() {
    this.openModel = false;
  }

  studentSurvey() {
    getStudentSurvey({ studentId: this.studentRecordId })
      .then((result) => {
        this.surveyrecordTypeId = result.Id;
      })
      .catch((error) => {
        this.error = error;
      });
  }
}
