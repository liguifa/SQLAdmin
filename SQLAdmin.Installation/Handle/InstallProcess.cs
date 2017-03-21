using Ionic.Zip;
using IWshRuntimeLibrary;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace MMS.Installation
{
    public class InstallProcess
    {
        private string mSrcCAB = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\Data.cab");
        private string mRegistryKey = @"Software\Microsoft\Windows\CurrentVersion\Uninstall\MMS";
        private long mCabFileSize = 0;
        private long mExtractedSize = 0;
        private ProcessViewModel mProcess = ProcessViewModel.GetInstance();

        public void Start()
        {
            Thread install = new Thread(Install);
            install.Start();
        }

        private void Install(object obj)
        {
            this.mProcess.RefreshProgressBar("解压文件", 0);
            this.Decompression();
            this.mProcess.RefreshProgressBar("创建注册表", 80);
            this.CreateRegistry();
            this.mProcess.RefreshProgressBar("创建快捷方式", 90);
            this.CreateDestopShortcut();
            this.mProcess.RefreshProgressBar("保存配置", 97);
            this.SaveConfig();
            this.mProcess.RefreshProgressBar("安装完成", 100);
        }

        private void Decompression()
        {
            string targetLocation = InstallPathViewModel.GetInstance().InstallPath;
            using (FileStream fs = System.IO.File.Open(this.mSrcCAB, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                this.mCabFileSize = fs.Length;
            }
            if (!Directory.Exists(targetLocation))
            {
                Directory.CreateDirectory(targetLocation);
            }
            using (ZipFile zip = ZipFile.Read(new FileStream(this.mSrcCAB, FileMode.Open, FileAccess.ReadWrite)))
            {
                zip.ExtractProgress += DecompressionProgres;
                foreach (ZipEntry file in zip.Entries)
                {
                    try
                    {
                        file.Extract(targetLocation, ExtractExistingFileAction.OverwriteSilently);
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }
        }

        private void DecompressionProgres(object sender, ExtractProgressEventArgs e)
        {
            try
            {
                if (e.EventType == ZipProgressEventType.Extracting_BeforeExtractEntry)
                {
                    int temp = 0;

                    this.mCabFileSize += e.CurrentEntry.CompressedSize;

                    if (this.mCabFileSize != 0)
                    {
                        temp = Convert.ToInt32(70 * ((double)this.mCabFileSize / this.mCabFileSize));
                    }

                    if (temp >= 70)
                    {
                        temp = 70;
                    }
                    this.mProcess.RefreshProgressBar(e.CurrentEntry.FileName, temp);
                }
            }
            catch (Exception ex)
            {

            }
        }

        private void CreateRegistry()
        {
            RegistryKey root = Registry.LocalMachine;
            if (root.OpenSubKey(this.mRegistryKey) != null)
            {
                root.DeleteSubKey(this.mRegistryKey);
            }
            root.CreateSubKey(this.mRegistryKey);
            RegistryKey key = root.OpenSubKey(this.mRegistryKey, true);
            if (key != null)
            {
                key.SetValue("DisplayName", "Mongodb Manager Studio");
                key.SetValue("UninstallString", "#");
                key.SetValue("InstallLocation", InstallPathViewModel.GetInstance().InstallPath);
                key.SetValue("DisplayVersion", "1.0.0");
                key.SetValue("DisplayVersion", "liguifa");
                key.SetValue("HelpLink", "");
                key.SetValue("DisplayIcon", Path.Combine(InstallPathViewModel.GetInstance().InstallPath, @"Images\displayLogo.ico"));
            }
        }

        private void CreateDestopShortcut()
        {
            WshShell shell = new WshShell();
            IWshShortcut shortcut = (IWshShortcut)shell.CreateShortcut(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), "Mongodb Manager Studion.lnk"));
            shortcut.TargetPath = Path.Combine(InstallPathViewModel.GetInstance().InstallPath, "MMS.Client.exe");
            shortcut.WorkingDirectory = InstallPathViewModel.GetInstance().InstallPath;
            shortcut.WindowStyle = 1;
            shortcut.Description = "Mongodb Manager Studion";
            shortcut.IconLocation = Path.Combine(InstallPathViewModel.GetInstance().InstallPath, @"Images\displayLogo.ico");
            shortcut.Save();
        }

        private void SaveConfig()
        {
            XElement config = new XElement("configuration",
                new XElement("mongod", new XAttribute("path", MongoSetViewModel.GetInstance().MongodPath))
            );
            config.Save(Path.Combine(InstallPathViewModel.GetInstance().InstallPath, "mms.config"));
        }
    }
}
