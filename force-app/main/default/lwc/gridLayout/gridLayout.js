import { LightningElement, wire } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
export default class GridLayout extends LightningElement {
  columns = [
    { label: "Name", fieldName: "Name" },
    { label: "Field", fieldName: "Field" }
  ];
  data = [
    { Name: "a", Field: "1" },
    { Name: "a", Field: "1" }
  ];
  filterShowHide = true;

  @wire(CurrentPageReference) pageRef;
  connectedCallback() {
    if (!this.pageRef) {
      this.pageRef = {};
      this.pageRef.attributes = {};
      this.pageRef.attributes.LightningApp = "LightningApp";
    }
    // subscribe to bearListUpdate event
    registerListener("studentRecordId", this.handleStudentRecord, this);
    registerListener("hideFilter", this.handleFilter, this);
    registerListener("stdRecord", this.handleStudentRec, this);
  }
  disconnectedCallback() {
    // unsubscribe from bearListUpdate event
    unregisterAllListeners(this);
  }

  handleStudentRecord(recordId) {
    this.seatSection = true;
    console.log("student record: " + recordId);
  }

  handleStudentRec(record) {
    console.log("student record details: " + JSON.stringify(record));
  }

  handleFilterButtonClick() {
    //this.likeState = !this.likeState;
    //this.section= !this.section;
    //console.log('this.section: '+this.section);
  }

  get seatSize() {
    return this.filterShowHide === false ? "6" : "4";
  }

  handleFilter(filterstatus) {
    this.filterShowHide = filterstatus;
  }
}
