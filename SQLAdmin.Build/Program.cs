using Ionic.Zip;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MMS.Build
{
    class Program
    {
        private static List<string> csprojs = new List<string>()
        {
            @"..\MMS.UI\MMS.UI.csproj",
            @"..\MMS.Installation\MMS.Installation.csproj",
            @"..\MMS.Command\MMS.Command.csproj",
            @"..\MMS.Client\MMS.Client.csproj",
            @"..\MMS.MongoDB\MMS.MongoDB.csproj",
            @"..\MMS.Grammar\MMMS.Grammar.csproj",
        };

        private static string MSBuild = @"C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\MSBuild.exe";
        private static string arg = "/target:Rebuild \"/p:Configuration=Release;Platform=Any CPU\" \"{0}\"";

        static void Main(string[] args)
        {
            Build();
            if (Directory.Exists(@"..\..\..\Package\Setup"))
            {
                Directory.Delete(@"..\..\..\Package\Setup", true);
            }
            Directory.CreateDirectory(@"..\..\..\Package\Setup");
            CompressDirToZip(@"..\..\..\bin\Install", @"..\..\..\Package\Setup\Install.dat", @"..\..\..\Package\Setup", null);
            CompressDirToZip(@"..\..\..\bin\Release", @"..\..\..\Package\Setup\Data.cab", @"..\..\..\Package\Setup", null);
            CopyTool(@".\Tool\Setup.exe", @"..\..\..\Package\Setup\Setup.exe");
            //CopyTool(@".\Tool\Package.exe", @"..\..\..\Package\Package.exe");
            PackageExe();
            Console.WriteLine("Finsih.");
            Console.Read();
        }

        private static void Build()
        {
            foreach (string csproj in csprojs)
            {
                using (Process build = new Process())
                {
                    build.StartInfo = new ProcessStartInfo();
                    build.StartInfo.FileName = MSBuild;
                    build.StartInfo.Arguments = String.Format(arg, csproj);
                    build.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                    build.StartInfo.CreateNoWindow = true;
                    build.StartInfo.RedirectStandardInput = false;
                    build.StartInfo.RedirectStandardOutput = true;
                    build.StartInfo.RedirectStandardError = true;
                    build.StartInfo.UseShellExecute = false;
                    build.StartInfo.WorkingDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\");
                    build.OutputDataReceived += new DataReceivedEventHandler(ReceiveProcessResult);
                    build.ErrorDataReceived += new DataReceivedEventHandler(ReceiveErrorResult);
                    build.Start();
                    build.WaitForExit();
                }
            }
        }

        private static void CompressDirToZip(string srcFolder, string desZipFile, string directoryPathInArchive, string password)
        {
            if (File.Exists(desZipFile))
            {
                File.Delete(desZipFile);
            }
            ZipFile destinationFile = new ZipFile(desZipFile);
            if (!string.IsNullOrEmpty(password))
            {
                destinationFile.Password = password;
            }
            destinationFile.AddDirectory(srcFolder);
            destinationFile.Save();
        }

        private static void CopyTool(string src, string des)
        {
            File.Copy(src, des);
        }

        private static void PackageExe()
        {
            using (Process build = new Process())
            {
                build.StartInfo = new ProcessStartInfo();
                build.StartInfo.FileName = @".\Tool\Package.exe";
                build.StartInfo.Arguments = string.Format("pack {0} *.* {1} {2} {3}", @"..\..\..\Package\Setup", AppDomain.CurrentDomain.BaseDirectory, "MMS.exe", "arg");
                build.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                build.StartInfo.CreateNoWindow = true;
                build.StartInfo.RedirectStandardInput = false;
                build.StartInfo.RedirectStandardOutput = true;
                build.StartInfo.RedirectStandardError = true;
                build.StartInfo.UseShellExecute = false;
                build.StartInfo.WorkingDirectory = AppDomain.CurrentDomain.BaseDirectory;
                build.OutputDataReceived += new DataReceivedEventHandler(ReceiveProcessResult);
                build.ErrorDataReceived += new DataReceivedEventHandler(ReceiveErrorResult);
                build.Start();
                build.WaitForExit();
            }
        }

        private static void ReceiveErrorResult(object sender, DataReceivedEventArgs e)
        {
            Console.WriteLine(String.Format("Info {0}:{1]", DateTime.Now, e.Data));
        }

        private static void ReceiveProcessResult(object sender, DataReceivedEventArgs e)
        {
            Console.WriteLine(String.Format("Error {0}:{1]", DateTime.Now, e.Data));
        }
    }
}
