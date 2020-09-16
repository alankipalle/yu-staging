/******************************************************************************************
Name : SetContractEventName
Purpose : Sets the Contract Event's Name field based on the linked engagement's site, LC, student name, date, and contract event type.
Objects Modified : itself (Contract_Event__c)
******************************************************************************************/
// Added above comment for story S-286350 - Hemlata
trigger SetContractEventName on Contract_Event__c bulk (before insert, before update) {
    Set<Id> engagementIds = new Set<Id>();
    for (Contract_Event__c evt : System.Trigger.new) {
        if(evt.Engagement__c != Null){
            engagementIds.add(evt.Engagement__c);
        }
    }
  
    Map<Id, Engagement__c> engagements = new Map<Id, Engagement__c>(
                                                 [select Site__c, 
                                                         Learning_Community__r.Name, 
                                                         Student__r.Full_Name__c 
                                                  from   Engagement__c 
                                                  where  Id in :engagementIds]); 
                                             
    for (Contract_Event__c evt : System.Trigger.new) { 
        DateTime dt = Datetime.newInstance(evt.Event_Date__c.year(),
                                           evt.Event_Date__c.month(),
                                           evt.Event_Date__c.day(),0,0,0);
        if(evt.Engagement__c != Null){
            Engagement__c eng = engagements.get(evt.Engagement__c);
            evt.Name = eng.Site__c 
                   //+ '-' + eng.Learning_Community__r.Name 
                   //+ '-' + eng.Student__r.Full_Name__c
                   + '-' + dt.format('yyyyMMdd') 
                   + '-' + evt.Contract_Event_Type__c;
        }else{ evt.Name = dt.format('yyyyMMdd') + '-' + evt.Contract_Event_Type__c;}
       
        
    }
}