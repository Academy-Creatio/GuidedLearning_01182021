using GuidedLearningShared;
using Terrasoft.Core;
using Terrasoft.Core.Factories;

namespace Terrasoft.Configuration
{

	[DefaultBinding(typeof(IMsgChannelUtilities))]
	public class Helper : IMsgChannelUtilities
	{
		public void PostMessage(UserConnection userConnection, string senderName, string messageText)
		{
			MsgChannelUtilities.PostMessage(userConnection, senderName, messageText);
		}

		public void PostMessageToAll(string senderName, string messageText)
		{
			MsgChannelUtilities.PostMessageToAll(senderName, messageText);
		}
	}
}