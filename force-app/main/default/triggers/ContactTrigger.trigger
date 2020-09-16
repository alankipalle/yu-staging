trigger ContactTrigger on Contact (before insert, before update, after update,before delete) { // Added events S-332459
    //Added by Lalit for S-292429 START
    for(SkipTrigger__c skipTrg : SkipTrigger__c.getAll().values()){
     if(skipTrg.name == userinfo.getUserID().subString(0,15)){
       system.debug(skipTrg.name+'--->'+ userinfo.getUserID().subString(0,15));
       return;
     }
    }
    //Added by Lalit for S-292429 END
    ContactManager contactManager = new ContactManager();
    if(!trigger.isDelete) // Added by Jai since it was causing error on delete event (trigger.new is null)
        contactManager.onBeforeInsertUpdate(Trigger.new);
    //Added by Lalit for S-292429 START
    if(Trigger.isBefore && Trigger.isUpdate){
        new ContactManager().onBeforeUpdate(Trigger.new, Trigger.oldMap);
    } 
    if(Trigger.isBefore && Trigger.isInsert){
        new ContactManager().onBeforeInsert(Trigger.new);
    } 
    // Start Jai Gupta - S-332459 - July 29,2015 - Sync address fields*/
    if(Trigger.isAfter && Trigger.isUpdate){
        contactManager.onAfterUpdate(trigger.new,trigger.oldMap);
    } 
    if(Trigger.isBefore && Trigger.isDelete){
        contactManager.onBeforeDelete(trigger.oldMap);
    } 
    // End Jai Gupta - S-332459 - July 29,2015 - Sync address fields*/
    //Added by Lalit for S-292429 END
    /*  BEGIN S-298669  */
    
    if(Trigger.isInsert && Trigger.isBefore){
        contactManager.onInsert(Trigger.new);
    }
    
    /*   END S-298669   */
    
}