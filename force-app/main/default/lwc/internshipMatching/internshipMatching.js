import { LightningElement, track, wire } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class InternshipMatching extends LightningElement {
  section = true;
  likeState = false;
  seatSection = false;
  filterShowHide = true;
  customBackround = "redColor";
  seatsClass = "slds-col slds-size_1-of-1 slds-large-size_4-of-12";

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
  }
  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  handleStudentRecord(recordId) {
    this.seatSection = true;
  }

  handleFilter(filterstatus) {
    this.filterShowHide = filterstatus;
  }

  get seatSize() {
    return this.filterShowHide === false ? "6" : "4";
  }
}
