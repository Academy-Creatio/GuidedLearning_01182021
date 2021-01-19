using System.Collections.Generic;
using Terrasoft.Core;
using Terrasoft.Core.Entities;
using Terrasoft.Core.Entities.Events;

namespace Terrasoft.Configuration
{
	/// <summary>
	/// Listener for 'EntityName' entity events.
	/// https://academy.creatio.com/docs/developer/back-end_development/entity_event_layer/entity_event_layer
	/// </summary>
	/// <seealso cref="Terrasoft.Core.Entities.Events.BaseEntityEventListener" />
	[EntityEventListener(SchemaName = "Contact")]
	class ContactEL : BaseEntityEventListener
	{
		#region Methods : Public : OnSave
		public override void OnSaving(object sender, EntityBeforeEventArgs e)
		{
			base.OnSaving(sender, e);
			Contact contact = (Contact)sender;
			List<string> interestingColumns = new List<string>() { nameof(contact.Name), nameof(contact.Email) };
			UserConnection userConnection = contact.UserConnection;
			
			string oldName = contact.GetTypedOldColumnValue<string>(nameof(contact.Name));
			foreach(var item in contact.GetChangedColumnValues())
			{
				if(interestingColumns.Contains(item.Name))
				{
					if (oldName.Contains("Random"))
					{
						e.IsCanceled = true;
					}
				}
				
			}
		}
		public override void OnSaved(object sender, EntityAfterEventArgs e)
		{
			base.OnSaved(sender, e);
			Contact contact = (Contact)sender;
			UserConnection userConnection = contact.UserConnection;



			foreach(var item in e.ModifiedColumnValues)
			{
			}

			string newName = contact.GetTypedColumnValue<string>(nameof(contact.Name));
			string oldName = contact.GetTypedOldColumnValue<string>(nameof(contact.Name));



		}
		#endregion

		#region Methods : Public : OnInsert
		public override void OnInserting(object sender, EntityBeforeEventArgs e)
		{
			base.OnInserting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnInserted(object sender, EntityAfterEventArgs e)
		{
			base.OnInserted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion

		#region Methods : Public : OnUpdate
		public override void OnUpdating(object sender, EntityBeforeEventArgs e)
		{
			base.OnUpdating(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnUpdated(object sender, EntityAfterEventArgs e)
		{
			base.OnUpdated(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion

		#region Methods : Public : OnDelete
		public override void OnDeleting(object sender, EntityBeforeEventArgs e)
		{
			base.OnDeleting(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		public override void OnDeleted(object sender, EntityAfterEventArgs e)
		{
			base.OnDeleted(sender, e);
			Entity entity = (Entity)sender;
			UserConnection userConnection = entity.UserConnection;
		}
		#endregion



	}
}
