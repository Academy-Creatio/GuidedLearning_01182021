define("ContactPageV2", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "Contact",
		attributes: {

			"MyAttribute": {
				dataValueType: this.Terrasoft.DataValueType.TEXT,
				dependencies: [
					{
						columns: ["MobilePhone", "Phone"],
						methodName: "onMobilePhoneChanged"
					}
				]
			},
			"Account": {
				lookupListConfig: {
					"columns": ["Industry", "AlternativeName"]
				}
			}
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			init: function(){
				this.callParent(arguments);
			},
			onEntityInitialized: function() {
				this.callParent(arguments);
				this.getSysSetting();
			},
			onMobilePhoneChanged: function(){
				if(arguments && arguments[1]){
					var columnChanged = arguments[1]
					this.showInformationDialog(columnChanged + " column changed");
				}
			},
			getSysSetting: function(){
				sysSettings = ["MyImportantSetting", "MyImportantSetting2"];
				Terrasoft.SysSettings.querySysSettingsItem(sysSettings[1], function(value) {
					var result = Ext.String.format("{0} : {1}", sysSettings[1], value);
					//this.showInformationDialog(result)
				}, this);
			},
			/**
			* @inheritdoc Terrasoft.BasePageV2#getActions
			* @overridden
			*/
			getActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuSeparator());
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Tag": "callBackEnd", //method to execute onClick
					"Caption": "Page Menu Action"
				}));
				return actionMenuItems;
			},
			showMessage: function(){
				var id = this.$Id;
				var name = this.$Name;
				this.showInformationDialog(Ext.String.format("You clicked Id:{0} Name:{1}",id, name));
			},
			onOpenPrimaryContactClick: function(){
				this.showInformationDialog("Page button clicked");
			},

			callBackEnd: function(){
				var entityId = this.$Id;
				ServiceHelper.callService(
					"CreatioWsTemplate",  //className
					"PostMethodName",  //methodName
					function(response) {
						this.showInformationDialog(response)
					}, 
					{
						entityId: entityId
					}, 
					this //scope
					);



			}




		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "Country",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "Country"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "City",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 5,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "City"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "insert",
				"name": "Region",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ContactGeneralInfoBlock"
					},
					"bindTo": "Region"
				},
				"parentName": "ContactGeneralInfoBlock",
				"propertyName": "items",
				"index": 8
			},
			{
                // Indicates that an operation of adding an item to the page is being executed.
                "operation": "insert",
                // Metadata of the parent control item the button is added.
                "parentName": "LeftContainer",
                 // Indicates that the button is added to the control items collection
                 // of the parent item (which meta-name is specified in the parentName).
                "propertyName": "items",
                // Meta-name of the added button.
                "name": "PrimaryContactButton",
                // Supplementary properties of the item.
                "values": {
                    // Type of the added item is button.
                    itemType: Terrasoft.ViewItemType.BUTTON,
                    //  Binding the button title to a localizable string of the schema..
                    caption: "My Page Button",
                    // Binding the button press handler method.
                    click: {bindTo: "onOpenPrimaryContactClick"},
                    // Binding the property of the button availability.
                    enabled: true,
                    // Setting the button style.
                    style: Terrasoft.controls.ButtonEnums.style.RED
                }
            }
		]/**SCHEMA_DIFF*/
	};
});
