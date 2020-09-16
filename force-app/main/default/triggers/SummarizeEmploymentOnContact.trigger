trigger SummarizeEmploymentOnContact on Employment__c bulk (after insert, after update, after delete) {

   //List<Contact> contacts = new List<Contact>();
   Set<Id> contactIds = new Set<Id>();
    
   if(Trigger.isInsert || Trigger.isUpdate)
   {   
       for (Employment__c employment : System.Trigger.new) {
          // pull the list of student contacts that might need updating
          contactIds.add(employment.Employee__c);
       }
   }
   if(Trigger.isDelete)
   {
          for (Employment__c employment : System.Trigger.old) {
          // pull the list of student contacts that might need updating
          contactIds.add(employment.Employee__c);
       }
   }
   
   AlumniUtilities au = new AlumniUtilities();
   au.SummarizeEmpEdTrOnContact(contactIds);    
}