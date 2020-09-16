trigger EvaluationTrigger on Evaluation__c (after insert, after update, before insert, before update) {
    if(trigger.isAfter) {
        if(trigger.isInsert) {
            EvaluationTriggerHandler.afterInsertEvaluation(trigger.new);
        }else if(trigger.isUpdate) {
            EvaluationTriggerHandler.afterUpdateEvaluation(trigger.new, trigger.oldMap);
        }
    }
    
    if(trigger.isBefore){
        EvaluationTriggerHandler.beforeInsertUpdateEvaluation(trigger.new); 
    }
}