<aura:application extends="force:slds">
    
    <!-- attributes -->
    <aura:attribute name="data" type="Object"/>
    <aura:attribute name="columns" type="List"/>
    <aura:attribute name="selectedRowsCount" type="Integer" default="0"/>
    <aura:attribute name="currentSelectedRows" type="List" />
    <aura:attribute name="overallSelectedRows" type="List" />
    <aura:attribute name="currentPageNumber" type="Integer" default="0"/>
    <aura:attribute name="isLastPage" type="Boolean" />
    
    <!-- handlers-->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    
    <div class="title">LIGHTNING DATATABLE WITH PAGINATION AND SELECTABLE ROWS</div>
    
    <div class="align-table">
        <lightning:datatable columns="{!v.columns}"
                             data="{!v.data}"
                             keyField="id"
                             selectedRows="{!v.currentSelectedRows}"
                             onrowselection="{!c.selectedRows}"/>        
        <div class="slds-text-align_center slds-m-top_small">
            <lightning:button label="Prev" iconName="utility:chevronleft" iconPosition="left"
                              onclick="{!c.handlePrev}" disabled="{!v.currentPageNumber == 0}"/>
            
            <lightning:button label="Next" iconName="utility:chevronright" iconPosition="right"
                              onclick="{!c.handleNext}" disabled="{!v.isLastPage}"/>
        </div>
        
        <br/>
        <strong>Selected items from current page:</strong>
        <aura:iteration var="currentRow" items="{!v.currentSelectedRows}">
            <br/>{!currentRow}
        </aura:iteration>
        <br/><br/><br/>
        <strong>Selected items from all pages:</strong>
        <aura:iteration var="overallRow" items="{!v.overallSelectedRows}">
            <aura:iteration var="orow" items="{!overallRow}">
                <br/>{!orow}
            </aura:iteration>
        </aura:iteration>
    </div>
    
</aura:application>