using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Common.Utility
{
    public static class LambdaHelper
    {
        public static string GetColumn<T, TResult>(Expression<Func<T,TResult>> lambda)
        {
            return GetColumn(lambda.Body);
        }

        private static string GetColumn(Expression expression)
        {
            if (expression.NodeType == ExpressionType.MemberAccess)
            {
                MemberExpression memberExpression = GetMemberExpression(expression);
                return memberExpression.Member.Name;
            }
            return null;
        }

        private static MemberExpression GetMemberExpression(Expression expression)
        {
            switch (expression.NodeType)
            {
                case ExpressionType.MemberAccess:
                    return expression as MemberExpression;
                case ExpressionType.Convert:
                    return GetMemberExpression((expression as UnaryExpression).Operand);
            }

            throw new ArgumentException("Member expression expected");
        }
    }
}
