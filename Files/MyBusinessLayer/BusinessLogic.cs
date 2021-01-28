using GuidedLearningShared;
using Terrasoft.Core.Factories;

namespace GuidedLearning_01182021.Files.MyBusinessLayer
{

	[DefaultBinding(typeof(IBusinessLogic))]
	public class BusinessLogic : IBusinessLogic
	{
		public int AddNUmbers(int a, int b)
		{

			var msg = ClassFactory.Get<IMsgChannelUtilities>();
			msg.PostMessageToAll(GetType().Name, "this is my text from clio");

			return a + b+10;

		}
		public int MultiplyNnmbers(int a, int b)
		{
			return a * b;
		}
		public int SubNUmbers(int a, int b)
		{
			return a - b;
		}
	}
}
