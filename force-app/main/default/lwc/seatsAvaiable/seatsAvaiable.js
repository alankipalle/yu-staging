import { LightningElement, track, wire } from "lwc";
import getMatches from "@salesforce/apex/MATCH_lwcController.getMatchesbyStudent";
import getMatchFilters from "@salesforce/apex/MATCH_lwcController.getMatchesFilters";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";
const actions = [{ label: "Show details", name: "show_details" }];
const columns = [
  {
    label: "Name",
    fieldName: "nameUrl",
    wrapText: true,
    type: "url",
    typeAttributes: {
      label: { fieldName: "Matching_Seat_Name__c" },
      target: "_blank"
    },
    cellAttributes: { class: { fieldName: "customCssClass" } },
    sortable: "true"
  },
  {
    label: "Specialty",
    wrapText: true,
    fieldName: "Matching_Seat_Specialty_Name__c",
    cellAttributes: { class: { fieldName: "customCssClass" } },
    sortable: "true"
  },
  {
    label: "Car(mi)",
    fieldName: "Commute_Distance_Car_mi__c",
    cellAttributes: { class: { fieldName: "customCssClass" } }
  },
  {
    label: "Finalize?",
    fieldName: "Finalize_Match__c",
    cellAttributes: { class: { fieldName: "customCssClass" } }
  },
  {
    label: "Match Status",
    fieldName: "Match_Status__c",
    cellAttributes: { class: { fieldName: "customCssClass" } }
  }
];

export default class SeatsAvaiable extends LightningElement {
  data = [];
  columns = columns;
  rowOffset = 0;
  defaultSortDirection = "asc";
  sortDirection = "asc";
  sortedBy;
  section = true;
  label = "Hide";
  dataAvialble = false;
  seatSection = false;
  Employeroptions;
  trackOptions;
  specialtyOptions;
  employerName = "all";
  specilatyName = "all";
  trackName = "all";
  stdId;
  @wire(CurrentPageReference) pageRef;
  connectedCallback() {
    if (!this.pageRef) {
      this.pageRef = {};
      this.pageRef.attributes = {};
      this.pageRef.attributes.LightningApp = "LightningApp";
    }
    // subscribe to bearListUpdate event
    registerListener("studentRecordId", this.handleStudentRecord, this);
  }
  disconnectedCallback() {
    // unsubscribe from bearListUpdate event
    unregisterAllListeners(this);
  }

  handleKeyUp(evt) {
    console.log("searching...." + evt.target.value);
  }
  getSelectedRow(event) {
    var el = this.template.querySelector("lightning-datatable");
    var selected = el.getSelectedRows();
    this.showRowDetails(selected[0]);
  }

  handleHide() {
    this.section = !this.section;
    this.label = this.section === true ? "Hide" : "Show";
  }

  @wire(getMatchFilters, { studentId: "$stdId" })
  retrieveType(result) {
    if (result.data) {
      var filterData = result.data;
      this.Employeroptions = this.uniqueByValue(
        filterData.Employers,
        (it) => it.value
      );
      this.specialtyOptions = this.uniqueByValue(
        filterData.specialties,
        (it) => it.value
      );
      this.trackOptions = this.uniqueByValue(
        filterData.tracks,
        (it) => it.value
      );
    }
  }

  handleChange(event) {
    switch (event.target.name) {
      case "employer":
        this.employerName = event.detail.value;
        this.getMatchRecords(
          this.specilatyName,
          this.employerName,
          this.trackName
        );
        break;
      case "track":
        this.trackName = event.detail.value;
        this.getMatchRecords(
          this.specilatyName,
          this.employerName,
          this.trackName
        );
        break;
      case "specialty":
        this.specilatyName = event.detail.value;
        this.getMatchRecords(
          this.specilatyName,
          this.employerName,
          this.trackName
        );
        break;
      default:
    }
  }

  uniqueByValue(data, key) {
    return [...new Map(data.map((x) => [key(x), x])).values()];
  }

  handleStudentRecord(recordId) {
    this.seatSection = true;
    this.stdId = recordId;
    this.getMatchRecords("", "", "");
  }

  getMatchRecords(spName, empName, trackName) {
    console.log("specilatyName: " + spName);
    console.log("employerName: " + empName);
    console.log("trackName: " + trackName);
    getMatches({
      studentId: this.stdId,
      specialty: spName,
      employerName: empName,
      trackName: trackName
    })
      .then((result) => {
        this.data = result.map((record) =>
          Object.assign({ nameUrl: "/" + record.Id }, record)
        );
        // process all record a loop
        this.data.forEach(function (seat) {
          // if account phone number is null(undefined) then assign 2 custom class 'redRow & boldText' in a new (temp) field called 'customCssClass'
          // else assign 'greenRow' CSS class to 'customCssClass' new(temp) field
          if (seat.Finalize_Match__c) {
            seat.customCssClass = "redRow boldText";
          } else {
            seat.customCssClass = "greenRow";
          }
        });

        if (this.data.length > 0) {
          this.dataAvialble = true;
        } else {
          this.dataAvialble = false;
        }
        let records = result;
        let mathRecord;
        for (let i = 0; i < records.length; i++) {
          const rec = records[i];
          if (rec.Finalize_Match__c) {
            mathRecord = rec;
            break;
          }
        }

        let dataTableGlobalStyle = document.createElement("style");
        dataTableGlobalStyle.innerHTML = `
                                        .redRow{
                                          background-color:#ffe6cc;   
                                        }
                                        .greenRow{
                                          background-color:#ccffcc;
                                        }                                        
                                        
                                        .boldText{
                                          font-weight:bold !important;
                                        }
                                        `;
        document.head.appendChild(dataTableGlobalStyle);

        fireEvent(this.pageRef, "matchRecord", mathRecord);
      })
      .catch((error) => {
        this.error = error;
      });
  }

  isMatches(match) {
    return match.Finalize_Match__c === true;
  }

  increaseRowOffset() {
    this.rowOffset += 100;
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    switch (actionName) {
      case "View":
        this.showRowDetails(row);
        break;
      default:
    }
  }

  showRowDetails(row) {
    fireEvent(this.pageRef, "seatRecord", row);
  }
  doSorting(event) {
    this.sortBy = event.detail.fieldName;
    this.sortDirection = event.detail.sortDirection;
    this.sortData(this.sortBy, this.sortDirection);
  }

  sortData(fieldname, direction) {
    let parseData = JSON.parse(JSON.stringify(this.data));
    // Return the value stored in the field
    let keyValue = (a) => {
      return a[fieldname];
    };
    // cheking reverse direction
    let isReverse = direction === "asc" ? 1 : -1;
    // sorting data
    parseData.sort((x, y) => {
      x = keyValue(x) ? keyValue(x) : ""; // handling null values
      y = keyValue(y) ? keyValue(y) : "";
      // sorting values based on direction
      return isReverse * ((x > y) - (y > x));
    });
    this.data = parseData;
  }
}
