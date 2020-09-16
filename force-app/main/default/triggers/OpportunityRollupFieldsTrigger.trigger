trigger OpportunityRollupFieldsTrigger on Opportunity (after insert, after update, after delete) {
    if(trigger.isAfter && UtilityRunOnce.AddresstoAccount_RunCheck){
        if(trigger.isInsert || trigger.isUpdate ) {
            OpportunityRollupFields.sumRollupFields(trigger.new);
        }
        if(Trigger.isDelete) {
            OpportunityRollupFields.sumRollupFields(trigger.old);
        }
    }
}