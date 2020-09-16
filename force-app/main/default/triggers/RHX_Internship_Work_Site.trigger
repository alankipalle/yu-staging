trigger RHX_Internship_Work_Site on Internship_Work_Site__c
    (after delete, after insert, after undelete, after update, before delete) {
      /* Code commented by Kalyan, B due to Rollup Helper package removal.
      Type rollClass = System.Type.forName('rh2', 'ParentUtil');
        if(rollClass != null) {
              rh2.ParentUtil pu = (rh2.ParentUtil) rollClass.newInstance();
         if (trigger.isAfter) {
                        pu.performTriggerRollups(trigger.oldMap, trigger.newMap, new String[]{'Internship_Work_Site__c'}, null);
            }
    }
    */
}