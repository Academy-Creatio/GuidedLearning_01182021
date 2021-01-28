define("ContactSectionV2", [], function() {
	return {
		entitySchemaName: "Contact",
		attributes: {
			"Account": {
				lookupListConfig: {
					"columns": ["Industry", "AlternativeName"]
				}
			},
			"Contact": {
				lookupListConfig: {
					"columns": ["Notes"]
				}
			},
		},
		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,
		methods: {
			getSectionActions: function() {
				var actionMenuItems = this.callParent(arguments);
				actionMenuItems.addItem(this.getButtonMenuItem({
					"Click": {bindTo: "showMessage"},
					"Caption": "Section Menu Action",
					"Enabled": true
				}));
				return actionMenuItems;
			},

			showMessage: function(){
				var activeRow = this.get("ActiveRow");
                if (!activeRow) {
                    return false;
                }
				var id = this.get("GridData").get(activeRow).get("Id");
				var name = this.get("GridData").get(activeRow).get("Name");
				var account = this.get("GridData").get(activeRow).get("Account");
				this.showInformationDialog(
					Ext.String.format("You clicked Id:{0} Name:{1} Account{2}",id, name, account.displayValue)
				);
			}
		},
		diff: /**SCHEMA_DIFF*/[
			{
                // The operation of adding a component to the page is in progress..
                "operation": "insert",
                // The meta name of the parent container to which the button is added.
                "parentName": "CombinedModeActionButtonsCardLeftContainer",
                // The button is added to the parent component's collection.
                "propertyName": "items",
                // The meta-name of the button to be added.
                "name": "MainContactSectionButton",
                // Properties passed to the component's constructor.
                "values": {
                    // The type of the component to add is the button.
                    itemType: Terrasoft.ViewItemType.BUTTON,
                    // Bind the button header to the localizable string of the schema.
                    caption: "My Section Button",
                    // Bind the button click handler method.
                    click: { bindTo: "showMessage" },
                    // Binding the button availability property.
                    //enabled: { bindTo: "isAccountPrimaryContactSet" },
                    // Setting the location of the button.
                    layout: {
                        "column": 1,
                        "row": 6,
                        "colSpan": 1
                    }
                }
            }
		]/**SCHEMA_DIFF*/,
	};
});
