using GuidedLearning_01182021.Files.MyBusinessLayer;
using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Threading;
using Terrasoft.Core;
using Terrasoft.Web.Common;

namespace GuidedLearning_01182021
{
	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class CreatioWsTemplate : BaseService
	{
		#region Properties
		private SystemUserConnection _systemUserConnection;
		private SystemUserConnection SystemUserConnection
		{
			get
			{
				return _systemUserConnection ?? (_systemUserConnection = (SystemUserConnection)AppConnection.SystemUserConnection);
			}
		}
		#endregion

		#region Methods : REST
		[OperationContract]
		[WebInvoke(Method = "POST", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.WrappedRequest, ResponseFormat = WebMessageFormat.Json)]
		public string PostMethodName(Guid entityId)
		{
			UserConnection userConnection = UserConnection ?? SystemUserConnection;
			Thread.Sleep(20000);
			return "Ok";
		}

		[OperationContract]
		[WebInvoke(Method = "GET", RequestFormat = WebMessageFormat.Json, BodyStyle = WebMessageBodyStyle.Wrapped, 
			ResponseFormat = WebMessageFormat.Json)]
		public int GetMethodname(int a, int b)
		{
			//UserConnection userConnection = UserConnection ?? SystemUserConnection;
			var bl = new BusinessLogic();




			return bl.AddNUmbers(a, b);
		}

		#endregion

		#region Methods : Private

		#endregion
	}
}



