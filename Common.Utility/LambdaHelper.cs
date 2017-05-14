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

        public static List<string> GetConditions<T>(Expression<Func<T,bool>> lambda)
        {
            return GetConditions(lambda.Body);
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

        private static List<string> GetConditions(Expression expression)
        {
            ExpressionType operatorType = expression.NodeType;
            List<string> returnConditions = new List<string>();
            switch(operatorType)
            {
                case ExpressionType.And:returnConditions.AddRange(GetConditionForBinocular(expression,"And")); break;
                case ExpressionType.Or: returnConditions.AddRange(GetConditionForBinocular(expression, "Or")); break;
                case ExpressionType.GreaterThan: returnConditions.AddRange(GetConditionForBinocular(expression, ">")); break;
                case ExpressionType.MemberAccess:returnConditions.Add(GetConditionForMonocular(expression)); break;
                case ExpressionType.Constant:returnConditions.Add((expression as ConstantExpression).Value.ToString()); break;
            }
            return returnConditions;
        }

        private static List<string> GetConditionForBinocular(Expression expression,string @operator)
        {
            BinaryExpression binaryExpression = expression as BinaryExpression;
            List<string> leftConditions = GetConditions(binaryExpression.Left);
            List<string> rightConditions = GetConditions(binaryExpression.Right);
            List<string> returnConditions = new List<string>();
            returnConditions.AddRange(leftConditions);
            returnConditions.Add(@operator);
            returnConditions.AddRange(rightConditions);
            return returnConditions;
        }

        private static string GetConditionForMonocular(Expression expression)
        {
            return (expression as MemberExpression).Member.Name;
        }
    }
}
