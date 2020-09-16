import { LightningElement, track } from 'lwc';
import getAccountsWithOffset from "@salesforce/apex/accountPaginationList.getAccountsWithOffset";

export default class AccountPagingation extends LightningElement {
    @track accountData = [];
  @track data = [];
  @track recordId;
  @track pageNumber = 1;
  @track pageSize = 10;
  @track isLastPage = false;
  @track resultSize = 0;
  @track selection = [];
  @track allSelectedRows = [];
  @track hasPageChanged;
  @track initialLoad = true;
  @track error;
  @track selectedRows = [];
  @track columns = [
    { label: "Name", fieldName: "Name", type: "text" },
    { label: "BillingStreet", fieldName: "BillingStreet", type: "text" },
    {
      label: "Credit Card Number",
      fieldName: "Credit_Card_Number__c",
      type: "text"
    }
  ];


  connectedCallback() {
    this.getAccounts();
  }
  
  rowSelection(evt) {
    // Avoid any operation if page has changed
    // as this event will be fired when new data will be loaded in page
    // after clicking on next or prev page

    if (!this.hasPageChanged || this.initialLoad) {
      //set initial load to false
      this.initialLoad = false;

      //Get currently select rows, This will only give the rows available on 
      //current page

      let selectedRows = evt.detail.selectedRows;
      console.log("==current row---" + JSON.stringify(this.selectedRows));

      //Get all selected rows from datatable, this will give all the selected data      //from all the pages

      let allSelectedRows = this.selection;

      //Get current page number
      let currentPageNumber = this.pageNumber;

      //Process the rows now
      //Condition 1 -If any new row selected, add to our allSelectedRows attribute
      //Condition 2 - any row is deselected, remove from allSelectedRows attribute
      //Solution - Remove all rows from current page from allSelectedRows 
      //attribute and then add again


      //Removing all rows coming from curent page from allSelectedRows

    for(let j = allSelectedRows.length-1 ; j>=0 ; j--){
        let pageNumber = parseInt((allSelectedRows[j].split("-")[1]),10);
        if(pageNumber && pageNumber === currentPageNumber)
            allSelectedRows.splice(j, 1);
    }


    //Adding all the new selected rows in allSelectedRows
    for(let k=0; k<selectedRows.length; k++){
        allSelectedRows.push(selectedRows[k].Id);
    }
      //Setting new value in selection attribute
      this.selection.push(...allSelectedRows);
      this.selection=[...new Set(this.selection)];
      console.log("==current row---" + JSON.stringify(this.selection));
    }
    else this.hasPageChanged = false;
  }

  previousEve() {
    //Setting current page number
    let pageNumber = this.pageNumber;
    this.pageNumber = pageNumber - 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;
    this.getAccounts();
  }

  nextEve() {
    //get current page number
    let pageNumber = this.pageNumber;
    //Setting current page number
    this.pageNumber = pageNumber + 1;
    //Setting pageChange variable to true
    this.hasPageChanged = true;


    this.getAccounts();
  }

  get recordCount() {
    return (
      (this.pageNumber - 1) * this.pageSize +
      " to " +
      ((this.pageNumber - 1) * this.pageSize + this.resultSize)
    );
  }

  get disPre() {
    return this.pageNumber === 1 ? true : false;
  }

  getAccounts() {
    getAccountsWithOffset({
      pageSize: this.pageSize,
      pageNumber: this.pageNumber
    })
      .then(result => {
        let accountData = JSON.parse(JSON.stringify(result));
        if (accountData.length < this.pageSize) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }


        //Modify response to include the page number as well
        //in the id attribute of each row
        //This will help us to filter out the rows displayed on each page
        accountData.forEach(row => {
          row.Id = row.Id + "-" + this.pageNumber;
        });


        this.resultSize = accountData.length;
        this.data = accountData;

        //Set selected rows with our selection attribute which has id of each 
          attribute -->s


        this.template.querySelector(
          '[data-id="datarow"]'
        ).selectedRows = this.selection;
        console.log("--final selection----" + JSON.stringify(this.selection));
      })
      .catch(error => {
        this.error = error;
      });
  }
}