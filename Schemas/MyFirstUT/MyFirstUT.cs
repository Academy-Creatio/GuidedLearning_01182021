namespace Terrasoft.Core.Process.Configuration
{

	using Newtonsoft.Json;
	using Newtonsoft.Json.Linq;
	using System;
	using System.Collections.Generic;
	using System.Collections.ObjectModel;
	using System.Globalization;
	using Terrasoft.Common;
	using Terrasoft.Core;
	using Terrasoft.Core.Configuration;
	using Terrasoft.Core.DB;
	using Terrasoft.Core.Entities;
	using Terrasoft.Core.Process;
	using Terrasoft.UI.WebControls.Controls;

	#region Class: MyFirstUT

	/// <exclude/>
	public partial class MyFirstUT
	{

		#region Methods: Protected

		protected override bool InternalExecute(ProcessExecutingContext context) {


			var bl = Factories.ClassFactory.Get<GuidedLearningShared.IBusinessLogic>();
			var msg = Factories.ClassFactory.Get<GuidedLearningShared.IMsgChannelUtilities>();
			int sum = bl.AddNUmbers(A, B);

			Select select = new Select(UserConnection)
				.Column("Name")
				.From("Contact")
				.Where("Id").IsEqual(Column.Parameter(contactId)) as Select;

			string contactName = select.ExecuteScalar<string>();
			msg.PostMessage(UserConnection, GetType().Name, $"I've added {A} and {B} for Contact: {contactName}");

			result = sum;

			return true;
		}

		#endregion

		#region Methods: Public

		public override bool CompleteExecuting(params object[] parameters) {
			return base.CompleteExecuting(parameters);
		}

		public override void CancelExecuting(params object[] parameters) {
			base.CancelExecuting(parameters);
		}

		public override string GetExecutionData() {
			return string.Empty;
		}

		public override ProcessElementNotification GetNotificationData() {
			return base.GetNotificationData();
		}

		#endregion

	}

	#endregion

}

