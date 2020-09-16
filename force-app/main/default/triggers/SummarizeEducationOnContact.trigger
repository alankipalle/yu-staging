trigger SummarizeEducationOnContact on Higher_Education__c bulk (after insert, after update, after delete) {

   //List<Contact> contacts = new List<Contact>();
   Set<Id> contactIds = new Set<Id>();
      
   if(Trigger.isInsert || Trigger.isUpdate)
   {    
       for (Higher_Education__c hed : System.Trigger.new) {
          // pull the list of student contacts that might need updating
          contactIds.add(hed.Student__c);
       }
   }
   if(Trigger.isDelete)
   {    
       for (Higher_Education__c hed : System.Trigger.old) {
          // pull the list of student contacts that might need updating
          contactIds.add(hed.Student__c);
       }
   }
   
   AlumniUtilities au = new AlumniUtilities();
   au.SummarizeEmpEdTrOnContact(contactIds);    
  
}