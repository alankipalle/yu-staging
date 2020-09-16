import { LightningElement, track,wire,api } from 'lwc';
import getAffiliation from '@salesforce/apex/AffiliationInlineController.getAffiliation'
import getAffFilterRecords from '@salesforce/apex/AffiliationInlineController.getAffFilterRecords'
import { NavigationMixin } from 'lightning/navigation';

export default class AffiliationInline  extends NavigationMixin(LightningElement){
    @api recordId; 
    @track searchKey;
    @track lstofAffRecords;
    @track ModelAffiliation;
   
    @track isHierarchy=true;
    @track searchConRole;
    @track ContactSearch;
    @track TitleSearch;
    @track isLoaded = true;
    @track isSize=false;

    @track sortType='ASC';
    @track sortField='';


    @track isNameAsc=false;
    @track isNameDesc=false;

    @track isContactAsc=false;
    @track isContactDesc=false;
   
    @track isAccountAsc=false;
    @track isAccountDesc=false;

    @track isStatusAsc=false;
    @track isStatusDesc=false;

    @track istitleAsc=false;
    @track istitleDesc=false;

    @track isContactRoleAsc=false;
    @track isContactRoleDesc=false;

    @track isPrimaryAsc=false;
    @track isPrimaryDesc=false;


    @track isStartDateAsc=false;
    @track isStartDateDesc=false;

    @track isEndDateAsc=false;
    @track isEndDateDesc=false;

    @wire(getAffiliation, { recordId: '$recordId' })
   
    doInt({ error, data  }) {
        if (data) {
            var rec=JSON.stringify(data);
            this.ModelAffiliation=JSON.parse(rec);
            this.isLoaded=false;
           
            if(data.lstofAffRecords.length>0){
                this.isSize=true;
            }else{
                this.isSize=false;
            }
            this.isHierarchy =true;
            
           // this.error = undefined;
        } else if (error) {
            //this.error = error;
            //this.record = undefined;
        }
    }

   
    get options() {
        return [
            { label: '--None--', value: '' },
            { label: 'Executive Sponsor', value: 'Executive Sponsor' },
            { label: 'Senior Executive Leader', value: 'Senior Executive Leader' },
            { label: 'Program Leader', value: 'Program Leader' },
            { label: 'Line of Business Leader', value: 'Line of Business Leader' },
            { label: 'Human Resources/Talent Acquisition Leader', value: 'Human Resources/Talent Acquisition Leader' },
            { label: 'Diversity & Inclusion Leader', value: 'Diversity & Inclusion Leader' },
            { label: 'Philanthropic Leader', value: 'Philanthropic Leader' },
            { label: 'Community Relations Leader', value: 'Community Relations Leader' },
            { label: 'YUPRO Contact???', value: 'YUPRO Contact???' },
            { label: 'Alumni Leader', value: 'Alumni Leader' },
            { label: 'Internship Supervisor???', value: 'Internship Supervisor???' },
            { label: 'Supervisor Leader???', value: 'Supervisor Leader???' },
            { label: 'Billing Contact', value: 'Billing Contact' },
            { label: 'Role 1', value: 'Role 1' },
            { label: 'Role 2', value: 'Role 2' },
            { label: 'Role 3', value: 'Role 3' },
            { label: 'Role 4', value: 'Role 4' },
        ];
    }

    handleChange(event) {
        const field = event.target.name;

        if (field === 'isHierarchy') {
            this.isHierarchy = event.target.checked;
        } else if (field === 'searchConRole') {
            this.searchConRole = event.detail.value;
        
        }else if (field === 'ContactSearch') {
            this.ContactSearch = event.target.value;
        }else if (field === 'TitleSearch') {
            this.TitleSearch = event.target.value;
        }
    }

    selectedItem(event) {
     
         var urlId=event.target.id;
        urlId=urlId.split('-');
        urlId=urlId[0]
        window.open('/'+urlId,'_blank');

    }

 
    createNewItem(event) {
        var urlId=event.target.id;
        urlId=urlId.split('-');
        urlId=urlId[0];
        document.getElementById("ContactId").value=urlId;
        document.getElementById("AccountId").value=this.recordId;
        document.getElementById("btnTest").click();
       
    }
    searchItems(event) {
        this.isLoaded=true;
        getAffFilterRecords({settOfAllHouseholds:this.ModelAffiliation.settOfAllHousehold,isHierarchy: this.isHierarchy,searchConRole:this.searchConRole,ContactSearch:this.ContactSearch,TitleSearch:this.TitleSearch,recordId:this.recordId,sortType:'',sortField:'',issortItem:false,pageNumberIndex:1})
            .then(result => {
                this.isLoaded=false;
               
                var rec=JSON.stringify(result);
                this.ModelAffiliation=JSON.parse(rec);
              
                if(result.lstofAffRecords.length>0){
                    this.isSize=true;
                }else{
                    this.isSize=false;
                }

                  //Order Icons 
                  this.isNameAsc='';
                  this.isNameDesc='';
  
                  this.isContactAsc='';
                  this.isContactDesc='';
  
                  this.isAccountAsc='';
                  this.isAccountDesc='';
  
                  this.isStatusAsc='';
                  this.isStatusDesc='';
  
                  this.istitleAsc='';
                  this.istitleDesc='';
  
                  this.isContactRoleAsc='';
                  this.isContactRoleDesc='';
  
                  this.isPrimaryAsc='';
                  this.isPrimaryDesc='';
  
  
                  this.isStartDateAsc='';
                  this.isStartDateDesc='';
  
                  this.isEndDateAsc='';
                  this.isEndDateDesc='';
                
            })
            .catch(error => {
                this.isLoaded=false;
              
            });
    }

    sortRecordRecord(event) {
        this.isLoaded=true;
        var sortFld=event.target.id;
        sortFld=sortFld.split(',');
        this.sortField=sortFld[0];
       
        if(this.sortField!=this.ModelAffiliation.lastField){
            this.sortType='ASC';
        }else {
            if(this.sortType=='ASC'){
                this.sortType='DESC';
            }else{
                this.sortType='ASC';
            }
        }
        getAffFilterRecords({settOfAllHouseholds:this.ModelAffiliation.settOfAllHousehold,isHierarchy: this.isHierarchy,searchConRole:this.searchConRole,ContactSearch:this.ContactSearch,TitleSearch:this.TitleSearch,recordId:this.recordId,sortType:this.sortType,sortField:this.sortField,issortItem:true,pageNumberIndex:1})
            .then(result => {
               
                this.isLoaded=false;
              
                var rec=JSON.stringify(result);
                this.ModelAffiliation=JSON.parse(rec);
              
                if(result.lstofAffRecords.length>0){
                    this.isSize=true;
                }else{
                    this.isSize=false;
                }


                //Order Icons 
                this.isNameAsc='';
                this.isNameDesc='';

                this.isContactAsc='';
                this.isContactDesc='';

                this.isAccountAsc='';
                this.isAccountDesc='';

                this.isStatusAsc='';
                this.isStatusDesc='';

                this.istitleAsc='';
                this.istitleDesc='';

                this.isContactRoleAsc='';
                this.isContactRoleDesc='';

                this.isPrimaryAsc='';
                this.isPrimaryDesc='';


                this.isStartDateAsc='';
                this.isStartDateDesc='';

                this.isEndDateAsc='';
                this.isEndDateDesc='';

                
                if(this.ModelAffiliation.sortField=='Name' && this.ModelAffiliation.sortType=='DESC'){
                    this.isNameDesc=true;
                }
                if(this.ModelAffiliation.sortField=='Name' && this.ModelAffiliation.sortType=='ASC'){
                    this.isNameAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__Contact__r.Name' && this.ModelAffiliation.sortType=='DESC'){
                    this.isContactDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__Contact__r.Name' && this.ModelAffiliation.sortType=='ASC'){
                    this.isContactAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__Organization__r.Name' && this.ModelAffiliation.sortType=='DESC'){
                    this.isAccountDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__Organization__r.Name' && this.ModelAffiliation.sortType=='ASC'){
                    this.isAccountAsc=true;
                }


                if(this.ModelAffiliation.sortField=='npe5__Status__c' && this.ModelAffiliation.sortType=='DESC'){
                    this.isStatusDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__Status__c' && this.ModelAffiliation.sortType=='ASC'){
                    this.isStatusAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__Contact__r.title' && this.ModelAffiliation.sortType=='DESC'){
                    this.istitleDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__Contact__r.title' && this.ModelAffiliation.sortType=='ASC'){
                    this.istitleAsc=true;
                }

                if(this.ModelAffiliation.sortField=='Contact_Role__c' && this.ModelAffiliation.sortType=='DESC'){
                    this.isContactRoleDesc=true;
                }
                if(this.ModelAffiliation.sortField=='Contact_Role__c' && this.ModelAffiliation.sortType=='ASC'){
                    this.isContactRoleAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__Primary__c' && this.ModelAffiliation.sortType=='DESC'){
                    this.isPrimaryDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__Primary__c' && this.ModelAffiliation.sortType=='ASC'){
                    this.isPrimaryAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__StartDate__c' && this.ModelAffiliation.sortType=='DESC'){
                    this.isStartDateDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__StartDate__c' && this.ModelAffiliation.sortType=='ASC'){
                    this.isStartDateAsc=true;
                }

                if(this.ModelAffiliation.sortField=='npe5__EndDate__c' && this.ModelAffiliation.sortType=='DESC'){
                    this.isEndDateDesc=true;
                }
                if(this.ModelAffiliation.sortField=='npe5__EndDate__c' && this.ModelAffiliation.sortType=='ASC'){
                    this.isEndDateAsc=true;
                }

            })
            .catch(error => {
                this.isLoaded=false;
               
            });
    }
    paginationRecords(event) {
        this.isLoaded=true;
        var fieldId=event.target.id;
        fieldId=fieldId.split('-');
        fieldId=fieldId[0];
        fieldId=fieldId.trim();
        if(fieldId=='First'){
            fieldId=1;
        }else  if(fieldId==='Previous'){
            fieldId=this.ModelAffiliation.pageNumber-1;
        }else  if(fieldId==='Next'){
            fieldId=this.ModelAffiliation.pageNumber+1;
        }else  if(fieldId==='Last'){
            fieldId=this.ModelAffiliation.totalPages;
        }
        getAffFilterRecords({settOfAllHouseholds:this.ModelAffiliation.settOfAllHousehold,isHierarchy: this.isHierarchy,searchConRole:this.searchConRole,ContactSearch:this.ContactSearch,TitleSearch:this.TitleSearch,recordId:this.recordId,sortType:this.sortType,sortField:this.sortField,issortItem:true,pageNumberIndex:fieldId})
        .then(result => {
           
            this.isLoaded=false;
            
            var rec=JSON.stringify(result);
            this.ModelAffiliation=JSON.parse(rec);
          
            if(result.lstofAffRecords.length>0){
                this.isSize=true;
            }else{
                this.isSize=false;
            }
        })
        .catch(error => {
            this.isLoaded=false;
     
        });

    }
    
}