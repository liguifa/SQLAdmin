using MMS.UI.Default;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;

namespace MMS.Grammar
{
    public class GrammarAnalysis
    {
        public void StartAnalysis(ref FlowDocument doc, Edit edit)
        {
            var element = Keyboard.FocusedElement;
            for (int p = 0; p < doc.Blocks.Count; p++)
            {
                if (doc.Blocks.ToList()[p] is Paragraph)
                {
                    Paragraph paragraph = (Paragraph)doc.Blocks.ToList()[p];
                    paragraph.LineHeight = 1;
                    for (int pNum = 0; pNum < paragraph.Inlines.Count; pNum++)
                    {
                        if (paragraph.Inlines.ToList()[pNum] is Run)
                        {
                            Run run = (Run)((Paragraph)paragraph).Inlines.ToList()[pNum];
                            string lineStr = run.Text;
                            bool isFinish = false;
                            for (int i = 0; i < lineStr.Length && !isFinish; i++)
                            {
                                for (int j = 1; j < lineStr.Length - i && !isFinish; j++)
                                {
                                    Color strColor = this.GetColorByGrammar(lineStr.Substring(i, j));
                                    if (strColor != Colors.Black)
                                    {
                                        if (i > 0)
                                        {
                                            run.Text = lineStr.Substring(0, i);
                                            Run r = new Run(lineStr.Substring(i, j));
                                            r.Foreground = new SolidColorBrush(strColor);
                                            ((Paragraph)paragraph).Inlines.Add(r);
                                            pNum++;
                                        }
                                        else
                                        {
                                            run.Text = lineStr.Substring(0, j);
                                            run.Foreground = new SolidColorBrush(strColor);
                                        }
                                        if (i + j < lineStr.Length)
                                        {
                                            Run r2 = new Run(lineStr.Substring(i + j, lineStr.Length - (i + j)));
                                            ((Paragraph)paragraph).Inlines.Add(r2);
                                        }
                                        isFinish = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            Keyboard.Focus(element);
        }

        public Color GetColorByGrammar(string str)
        {
            if (Keyword.IsKeyword(str))
            {
                return Colors.Blue;
            }
            return Colors.Black;
        }
    }
}
