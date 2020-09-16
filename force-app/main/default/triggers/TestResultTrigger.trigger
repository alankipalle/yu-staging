/**
 * trigger for the  Test Result object 
 */

trigger TestResultTrigger on Test_Info__c (before insert, before update,after insert,after update) {
    
     /** all events are handled by the TestResultTriggerHandler class */
    System.debug('*********Test Result Trigger*****');
    new TestResultTriggerHandler().run();
    //FutureTrueScreenController.sendReqMsg(Trigger.newMap.keySet());

}