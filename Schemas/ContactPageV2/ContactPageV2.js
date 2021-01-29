define("ContactPageV2", ["ServiceHelper"], function(ServiceHelper) {
	return {
		entitySchemaName: "Contact",
		messages: {
			"SectionActionClicked": {
					mode: this.Terrasoft.MessageMode.PTP,
					direction: this.Terrasoft.MessageDirectionType.SUBSCRIBE
			}
		},
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
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Email": {
				"99bde5a6-615c-44f2-bf48-334b79e6588f": {
					"uId": "99bde5a6-615c-44f2-bf48-334b79e6588f",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "Age"
							},
							"rightExpression": {
								"type": 0,
								"value": 17,
								"dataValueType": 4
							}
						}
					]
				},
				"11cf255b-d0f4-49e6-8feb-2bd397bd21e6": {
					"uId": "11cf255b-d0f4-49e6-8feb-2bd397bd21e6",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 2,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 7,
							"leftExpression": {
								"type": 1,
								"attribute": "Age"
							},
							"rightExpression": {
								"type": 0,
								"value": 17,
								"dataValueType": 4
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			init: function(){
				this.callParent(arguments);
				Terrasoft.ServerChannel.on(Terrasoft.EventName.ON_MESSAGE, this.onMessageReceived, this);
				this.subscribeToMessages();
			},
			subscribeToMessages: function(){
				this.sandbox.subscribe("SectionActionClicked",function(){this.onSectionMessageReceived();},
					this, ["THIS_IS_MY_TAG2"]);
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



			},

			/*** Validation Example */
			phoneValidator: function() {
			   
				// Variable for storing a validation error message.
                var invalidMessage = "";
                // Checking values in the [DueDate] and [CreatedOn] columns.
                if (this.$Phone && this.$Phone.length <10 ) {
                     // If the value of the [DueDate] column is less than the value
                     // of the [CreatedOn] column a value of the localizable string is
                     // placed into the variable along with the validation error message
                     // in the invalidMessage variable.
                    invalidMessage = "Phone needs to be filled in for Kirill";
                }
                 // Object whose properties contain validation error messages.
                 // If the validation is successful, empty strings are returned to the
                 // object.
                return {
                    // Validation error message.
                    invalidMessage: invalidMessage
                };
			},
			// Redefining the base method initiating custom validators.
            setValidationConfig: function() {
                // This calls the initialization of validators for the parent view model.
                this.callParent(arguments);
                // The dueDateValidator() validate method is added for the [CreatedOn] column.
                this.addColumnValidator("Phone", this.phoneValidator);
			},
			/***END of Validation Example */

			/** ESQ Example */
			esqExampleSingleRecord: function(){

				var recordId =  this.$Account.value;
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});
				
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");

				esq.getEntity(
					recordId, 
					function(result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}

						var Name = result.entity.get("Name");
						this.showInformationDialog(Name);
					}, 
					this
				);
			},
			esqExampleCollection: function(){
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");
				var i = 0;

				esq.getEntityCollection(
					function (result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}
						result.collection.each(
							function (item) {
								i++;
								var name = name + " "+item.$Name;
						});
						this.showInformationDialog("Total Accounts" + i);
					}, 
					this
				);


			},
			esqExampleCollectionWithFilter: function(){
				var esq = this.Ext.create("Terrasoft.EntitySchemaQuery", {rootSchemaName: "Account"});
				esq.addColumn("Id");
				esq.addColumn("Name");
				esq.addColumn("Industry");
				esq.addColumn("AlternativeName");
				esq.addColumn("Country.Name", "CountryName");

				//Filter
				var esqFirstFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Name", "Mexico");
				var esqSecondFilter = esq.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL, "Country.Name", "USA");
				esq.filters.logicalOperation = Terrasoft.LogicalOperatorType.OR;
				esq.filters.add("esqFirstFilter", esqFirstFilter);
				esq.filters.add("esqSecondFilter", esqSecondFilter);

				var i = 0;

				esq.getEntityCollection(
					function (result) {
						if (!result.success) {
							// error processing/logging, for example
							this.showInformationDialog("Data query error");
							return;
						}
						result.collection.each(
							function (item) {
								i++;
								var name = name + " "+item.$Name;
						});
						this.showInformationDialog("Total Accounts" + i);
					}, 
					this
				);


			},
			/** END of ESQ Example */


			/** SOCKET MESSAGE SUBSCRIBE */
			onMessageReceived: function(scope, message){
				if(message && message.Header.Sender === "MyHeader2" ){
					//var body = JSON.parse(message.Body);
					var body = message.Body;
					//this.showInformationDialog(body);
					if(JSON.parse(body).command === "refresh"){
						this.reloadEntity();
					}
				}
				return;
			},

			onSectionMessageReceived: function(){

				this.showInformationDialog("message received from section");
			}
			/** END OF SOCKET MESSAGE SUBSCRIBE */



		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "PrimaryContactButton",
				"values": {
					"itemType": 5,
					"caption": "My Page Button",
					"click": {
						//"bindTo": "onOpenPrimaryContactClick"
						//"bindTo": "esqExampleSingleRecord"
						//"bindTo": "esqExampleCollection"
						"bindTo": "esqExampleCollectionWithFilter"
					},
					"enabled": true,
					"style": "red"
				},
				"parentName": "LeftContainer",
				"propertyName": "items",
				"index": 7
			},
			{
				"operation": "merge",
				"name": "PhotoTimeZoneContainer",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "AccountName",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "JobTitleProfile",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "AccountMobilePhone",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3
					}
				}
			},
			{
				"operation": "merge",
				"name": "AccountPhone",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4
					}
				}
			},
			{
				"operation": "merge",
				"name": "AccountEmail",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5
					}
				}
			},
			{
				"operation": "merge",
				"name": "GeneralInfoTab",
				"values": {
					"order": 0
				}
			},
			{
				"operation": "merge",
				"name": "Type",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Owner",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "SalutationType",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Gender",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "Age",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 2
					}
				}
			},
			{
				"operation": "merge",
				"name": "Language",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 2
					}
				}
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
				"index": 8
			},
			{
				"operation": "merge",
				"name": "JobTabContainer",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "merge",
				"name": "Job",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "JobTitle",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 0
					}
				}
			},
			{
				"operation": "merge",
				"name": "Department",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 0,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "DecisionRole",
				"values": {
					"layout": {
						"colSpan": 12,
						"rowSpan": 1,
						"column": 12,
						"row": 1
					}
				}
			},
			{
				"operation": "merge",
				"name": "HistoryTab",
				"values": {
					"order": 2
				}
			},
			{
				"operation": "merge",
				"name": "NotesAndFilesTab",
				"values": {
					"order": 4
				}
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 5
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
