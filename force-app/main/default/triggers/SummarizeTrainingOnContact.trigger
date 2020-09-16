trigger SummarizeTrainingOnContact on Training_YU__c bulk (after insert, after update, after delete) {

   //List<Contact> contacts = new List<Contact>();
   Set<Id> contactIds = new Set<Id>();
      
   if(Trigger.isInsert || Trigger.isUpdate)
   {       
       for (Training_YU__c training : System.Trigger.new) {
          // pull the list of student contacts that might need updating
          contactIds.add(training.Student__c);
       }
   }
   if(Trigger.isDelete)
   {    
          for (Training_YU__c training : System.Trigger.old) {
          // pull the list of student contacts that might need updating
          contactIds.add(training.Student__c);
       }
   }
   
   AlumniUtilities au = new AlumniUtilities();
   au.SummarizeEmpEdTrOnContact(contactIds);
      
}